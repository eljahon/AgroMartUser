import { mapGetters, mapState } from "vuex";
import debounce from "lodash.debounce";
import VFooter from "~/components/main/footer.vue";
import signInModal from "~/modals/sign-in";
import signUpModal from "~/modals/sign-up";
import mobileMenu from "~/components/main/mobile-menu.vue";
import { socket } from "~/plugins/socket.client.js";
export default {
  name: "Header",
  components: {
    VFooter,
  },
  directives: {
    debounce,
  },
  data() {
    return {
      showUserMenu: false,
      isProfileOpened: false,
      showScroll: false,
      query: {
        filter: "",
        type: "all",
      },
    };
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.auth.loggedIn,
      currentUser: (state) => state.auth.user,
      userConnection: (state) => state.socket.userConnection,
      userConnectionStatus: (state) => state.socket.userConnectionStatus,
    }),
    ...mapGetters({}),
  },
  mounted() {
    document.addEventListener('scroll', this.checkScrollTop)
    if (this.$route.query.type) {
      this.query.type = this.$route.query.type
    }
    if (this.$route.query.filter) {
      this.query.filter = this.$route.query.filter
    }
    socket.on("joined", (res) => {
      console.log("Page: ", res);
    });
    socket.on("leaving", (res) => {
      console.log("PAGE LEAVED SOCKET ROOM:", res);
    });
    socket.on("message", (res) => {
      this.$store.dispatch("socket/sendMessage", res);
      console.log("Page Received Message Front: ", res);
    });
    socket.on("finishedChat", (res) => {
      this.$store.dispatch("socket/finishedChatId", res);
      console.log("Finished chat id: ", res);
    });
    this.$bridge.$on("selected_room", (message) => {
      this.joinToRoom(message);
    });
  },
  methods: {
    checkScrollTop() {
      if (!this.showScroll && window.pageYOffset > 95) {
        this.showScroll = true
      } else if (this.showScroll && window.pageYOffset <95) {
        this.showScroll = false
      }
    },
    searching() {
      if (this.query.filter && this.query.filter.length >= 3) {
        this.$router.push({
          path: this.localePath("/filter"),
          query: this.query,
        });
      }
    },
    async logOut() {
      this.isProfileOpened = !this.isProfileOpened;
      await localStorage.removeItem("local");
      await localStorage.removeItem("user_info");
      await this.$auth.logout();
    },
    toUserWork(data) {
      this.isProfileOpened = !this.isProfileOpened;
      this.$router.push({
        path: this.localePath(data.path),
      });
    },
    openMobileMenu() {
      this.$showPanel({
        component: mobileMenu,
        openOn: "left",
        width: (window.innerWidth * 3) / 4,
      });
    },
    openProfile() {
      this.isProfileOpened = !this.isProfileOpened;
    },
    menuClicked(item) {
      this.$router.push(this.localePath(item.route));
      return item;
    },
    changeRout() {
      this.$router.push({ path: this.localePath("/videos") });
    },
    signIn() {
      this.$modal.show(
        signInModal,
        { status: "sign-in" },
        {
          height: "auto",
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true,
        }
      );
      // this.$root.$once('user-change-modal', (item) => {
      //   console.log(item)
      // })
    },
    signUp() {
      this.$modal.show(
        signUpModal,
        { status: "sign-up" },
        {
          height: "auto",
          maxWidth: 400,
          width: window.innerWidth <= 350 ? window.innerWidth - 10 : 350,
          acrollable: true,
        }
      );
    },
    joinToRoom(message) {
      console.log("Join in room: ", {
        username: this.currentUser.username,
        room: message.room_id,
      });
      socket.emit(
        "join",
        {
          username: this.currentUser.username,
          room: typeof message.room_id === "string" ? parseInt(message.room_id) : message.room_id,
        },
        ({ res, rej }) => {
          if (res) {
            if (this.$route.query.room_id !== "new") {
              this.$store
                .dispatch("crud/chats/message/getMessages", {
                  "_where[0][roomID.id]": this.$route.query.room_id,
                })
                .then((res) => {
                  this.$store.dispatch("socket/setMessage", res);
                });
            }
          } else {
            console.error(rej);
          }
        }
      );
    },
  },
};
