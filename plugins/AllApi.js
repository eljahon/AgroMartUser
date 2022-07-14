export default function (context,inject) {
inject ('AllApi', {
  getHomeData,getVideo
})
  async function getHomeData () {
  const data = {
    consultation: [],
    products: [],
    news: [],
    information: [],
    prices: [],
  };
  try {
    await context.store.dispatch("crud/user/getUsers", {
      "_where[0][role.id]": 3,
      "_where[0][blocked]": false,
    }).then((res) => {
      data.consultation = res;
    });
    await context.store.dispatch("crud/trading/getTradingPost", {
      _limit: 4,
      _sort: "created_at:DESC",
      "_where[0][isblocked]": false,
    }).then((res) => {
      data.products = res;
    });
    await context.store.dispatch("crud/news/getNews", {
      locale: context.store.$i18n.locale,
      query: {
        "_where[0][category.id]": null,
        _start: 0,
        _limit: 4,
        _sort: "created_at:DESC",
      },
    }).then((res) => {data.news = res;});
    await context.store.dispatch("crud/usefulInfo/getUsefulInformation", {
      locale: context.store.$i18n.locale,
      query: {
        _start: 0,
        _limit: 15,
        _sort: "created_at:DESC",
      },
    }).then((res) => {data.information = res;});
    await context.store.dispatch("crud/price/getPrice", {
      "_where[0][islast]": true,
      "_where[0][avg_gt]": 0,
      _limit: 15,
    }).then((res) => {data.prices = res;});
  } catch(err) {
    console.log(err)
  }
  return data
  }
  async function getVideo (route) {
  let videos=[];
try {
  await context.store.dispatch('crud/video/getVideo',
    {
      _sort: 'created_at:DESC',
      '_where[0][category.id]': null,
      _limit: route.query.limit ?route.query.limit : 12 ,
      _start: route.query.offset ? (route.query.offset - 1) * route.query.limit : 0
    }).then((res) => {
    videos = res;
  })
}catch(err) {

}
return videos;
  }
}
