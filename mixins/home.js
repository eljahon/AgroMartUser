import ConsultantsSwiper from "~/components/main/consultants-swiper.vue";
import NewsSwiper from "~/components/main/news-swiper.vue";
import PricesSwiper from "~/components/main/prices-swiper.vue";
import TradingSwiper from "~/components/main/trading-swiper.vue";
import UsefulInformationSwiper from "~/components/main/useful-information-swiper.vue";
export default {
  components: {
    ConsultantsSwiper,
    PricesSwiper,
    TradingSwiper,
    NewsSwiper,
    UsefulInformationSwiper,
  },
  // data() {
  //   return {
  //     consultation: [],
  //     products: [],
  //     news: [],
  //     information: [],
  //     prices: [],
  //   };
  // },
  // mounted() {
  //   this.fetchHomePage();
  // },
  // methods: {
  //   async fetchHomePage() {
  //       await this.$store.dispatch("crud/user/getUsers", {
  //           "_where[0][role.id]": 3,
  //           "_where[0][blocked]": false,
  //         }).then((res) => {
  //           this.consultation = res;
  //         });
  //       await this.$store.dispatch("crud/trading/getTradingPost", {
  //           _limit: 4,
  //           _sort: "created_at:DESC",
  //           "_where[0][isblocked]": false,
  //         }).then((res) => {
  //           this.products = res;
  //         });
  //       await this.$store.dispatch("crud/news/getNews", {
  //           locale: this.$i18n.locale,
  //           query: {
  //             "_where[0][category.id]": null,
  //             _start: 0,
  //             _limit: 4,
  //             _sort: "created_at:DESC",
  //           },
  //         }).then((res) => {this.news = res;});
  //       await this.$store.dispatch("crud/usefulInfo/getUsefulInformation", {
  //           locale: this.$i18n.locale,
  //           query: {
  //             _start: 0,
  //             _limit: 15,
  //             _sort: "created_at:DESC",
  //           },
  //         }).then((res) => {this.information = res;});
  //       await this.$store.dispatch("crud/price/getPrice", {
  //           "_where[0][islast]": true,
  //           "_where[0][avg_gt]": 0,
  //           _limit: 15,
  //         }).then((res) => {this.prices = res;});
  //   },
  // },
};
