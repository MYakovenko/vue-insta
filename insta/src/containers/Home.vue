<template>
  <div id="app">
    <div class="wrapper">
      <div class="container">
        <div class="container__title">
          Find your inspiration with
          <span class="container__title__logo">INSTA</span>
          <!-- <span>{{searchText}}</span> -->
        </div>
        <div class="container__input-wrapper">
          <input class="search-input" :value="searchText" @keyup.enter="updateInput" ref="inputRef" />
          <button class="search-button" @click="click">Search</button>
        </div>
      </div>
      <p class="loader" v-if="loading">Loading...</p>
      <div v-else class="pictures-wrapper">
        <div class="pictures-wrapper_main">
          <draggable v-model="photos" :list="photos" group="search" handle=".handle">
            <picture-card
              class="handle"
              v-for="photo in photos"
              :key="photo.id"
              :id="photo.id"
              :datetaken="photo.datetaken"
              :title="photo.title"
              :url="photo.url_n"
              :views="photo.views"
              :ownername="photo.ownername"
            ></picture-card>
          </draggable>
        </div>
        <div class="pictures-wrapper_favorite">
          <h3 class="favorite_title">Favorites</h3>
          <div class="pictures-wrapper_favorite_block">
            <draggable
              v-model="favorites"
              :list="favorites"
              group="search"
              class="pictures-wrapper_favorite_block_drop"
            >
              <!-- <div class="picture-favorites-container" v-for="photo in favorites" :key="photo.id"> -->
              <picture-card
                class="picture-favorites-container"
                v-for="photo in favorites"
                :key="photo.id"
                :id="photo.id"
                :datetaken="photo.datetaken"
                :title="photo.title"
                :url="photo.url_n"
                :views="photo.views"
                :ownername="photo.ownername"
              ></picture-card>
              <!-- <button>delete</button>
              </div>-->
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import draggable from "vuedraggable";
import PictureCard from "../components/pictureCard.vue";

export default {
  name: "home",
  // data() {
  //   return {
  //     msg: "Welcome to Your Vue.js App"
  //   };
  // },
  components: {
    draggable,
    PictureCard
  },
  created() {
    this.$store.commit("loading");
    this.$store.dispatch("getPictures", this.searchText || "popular");
  },
  computed: {
    ...mapState({
      searchText: state => state.searchText,
      // favorites: state => state.favorites,
      loading: state => state.loading
    }),
    // photos() {
    //   return this.$store.getters.cleanImages;
    // }
    photos: {
      get() {
        return this.$store.state.photos;
        // return this.$store.getters.cleanImages;
      },
      set(value) {
        this.$store.commit("updatePictures", value);
      }
    },
    favorites: {
      get() {
        return this.$store.state.favorites;
        // return this.$store.getters.cleanImages;
      },
      set(value) {
        this.$store.commit("updateFavorites", value);
      }
    }
  },
  methods: {
    updateInput(e) {
      this.$store.commit("updateInput", e.target.value);
      this.$store.commit("loading");
      this.$store.dispatch("getPictures", e.target.value);
    },
    click(e) {
      this.$store.commit("updateInput", this.$refs.inputRef.value);
      this.$store.commit("loading");
      this.$store.dispatch("getPictures", this.$refs.inputRef.value);
    },
    handlerDrop(payload) {
      console.log("drop", payload);
      // const data = payload.item.__vue__._data._props;
      // const obj = {
      //   id: data.id,
      //   datetaken: data.datetaken,
      //   ownername: data.ownername,
      //   title: data.title,
      //   url: data.url,
      //   views: data.views
      // };
      // console.log("drop data", obj);
      if (this.favorites.some(payload => payload)) {
        // this.props.showMessage('This picture already in favorites');
        return;
      }
      // if (!localStorage.favorites) {
      //   localStorage.setItem("favorites", JSON.stringify([payload]));
      // } else if (favorites.some((elem) => elem.id === payload.id)) {
      // 	dispatch(showMessage('This picture already in favorites'));
      // } else {
      //   localStorage.setItem(
      //     "favorites",
      //     JSON.stringify(favorites.concat([payload]))
      //   );
      //   dispatch(changeFavorites());
      // }
      // this.$store.commit("handlerDrop", id);
    }
  }
};
</script>

<style lang="scss">
@import "../scss/utils/base";
@import "../scss/utils/vars";

#app {
  line-height: $mainLineHeight;
  font-family: "Raleway", "Times New Roman", Times, serif;
  font-size: $mainFontSize;
  color: $mainFontColor;
  height: 100%;

  @media screen and (max-width: $desktopWidth) {
    font-size: 16px;
  }
  @media screen and (max-width: $tableWidth) {
    font-size: 14px;
  }
  @media screen and (max-width: $phoneWidth) {
    font-size: 10px;
  }
}
.wrapper {
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  background-color: $light-color;

  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("../img/photomontage.jpg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: 0px;

  .container {
    min-height: 650px;
    margin: 0 auto;
    padding: 0 3%;
    text-align: center;
    background-image: url("../img/photo.jpg");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 2%;

    position: relative;

    &__title {
      width: 70%;
      font-family: Chewy;
      font-size: 8rem;
      color: $additional-color;

      position: absolute;
      top: 0;
      left: 0;

      &__logo {
        margin-left: 3%;
        font-size: 10rem;
        color: $main-color;
      }
    }

    &__input-wrapper {
      display: flex;
      width: 40%;
      flex-direction: row;
      margin-left: 3%;
      justify-content: center;
      align-items: center;

      position: absolute;
      bottom: 7%;
      left: 0;

      .search-input {
        width: 80%;
        padding: 1%;
        border: none;
        margin-right: 3%;
        border: 2px solid $default-color;
        font-family: Raleway;
        font-size: 1.5rem;

        &:focus {
          border: 2px solid $main-color;
        }
      }

      .search-button {
        background-color: $main-color;
        color: $default-color;
        padding: 1% 5%;
        border-style: none;
        border-radius: 2rem;
        font-family: Raleway;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;

        &:hover {
          background-color: $additional-color;
        }
        &:target {
          border: none;
        }
      }
    }
  }
  .pictures-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &_main {
      width: 65%;
      display: grid;
      grid-template-columns: 1fr 1fr;
      transition: all 0.2s ease;
      margin-right: 3%;
      padding: 1%;
      border: 3px solid $main-color;
      background-color: $opacity-light-color;
      margin-bottom: 2%;

      // &.isDraggingOver {
      //   background-color: $opacity-additional-color;
      // }
    }

    &_favorite {
      width: 33%;
      height: 94vh;
      padding: 1%;
      position: relative;
      position: -webkit-sticky;
      position: sticky;
      top: 3%;

      display: flex;
      flex-direction: column;

      border: 3px solid $additional-color;
      background-color: $opacity-light-color;

      &_block {
        overflow: auto;

        &_drop {
          min-height: 400px;
        }
      }

      .picture__close-icon {
        display: block;
      }

      .favorite_title:hover {
        color: $additional-color;
      }
    }
  }
  .picture-favorites-container {
    position: relative;
  }

  .favorite_title {
    font-family: Chewy;
    font-size: 4rem;
    color: $main-color;
    cursor: pointer;

    &.mobile {
      display: none;
    }
  }

  .close-icon {
    position: absolute;
    top: 5%;
    right: 5%;
  }

  .loader {
    font-size: 2.5rem;
    color: $main-color;
    margin-left: 2%;
    font-family: Chewy;
    text-align: center;

    @media (max-width: $phoneWidth) {
      font-size: 2rem;
    }
  }
}

@media (max-width: $desktopWidth) {
  .wrapper {
    .container {
      min-height: 500px;
      &__title {
        font-size: 6rem;

        &__logo {
          font-size: 8rem;
        }
      }
    }
  }
}

@media (max-width: $desktopMinWidth) {
  .wrapper {
    .container {
      min-height: 500px;
      &__title {
        font-size: 4.5rem;

        &__logo {
          font-size: 6rem;
        }
      }
    }
    .pictures-wrapper {
      max-width: 1000px;

      &_main {
        width: 67%;
      }

      &_favorite {
        width: 30%;
      }
    }
  }
}

@media (max-width: $tableWidth) {
  .wrapper {
    .container {
      min-height: 300px;
      &__title {
        font-size: 2.5rem;

        &__logo {
          font-size: 3.5rem;
        }
      }
    }
    .pictures-wrapper {
      padding: 2%;

      &_main {
        width: 55%;
        grid-template-columns: 1fr;
      }

      &_favorite {
        width: 40%;
        padding: 0;
      }
    }
  }
}

@media (max-width: $phoneWidth) {
  .wrapper {
    .container {
      min-height: 250px;
      &__title {
        width: 100%;
        font-size: 2.5rem;

        &__logo {
          font-size: 3.5rem;
        }
      }

      &__input-wrapper {
        width: 95%;
      }
    }
    .pictures-wrapper {
      padding: 0;

      &_main {
        width: 100%;
        padding: 0;
        grid-template-columns: 1fr;
        border: none;
        background-color: transparent;
      }

      &_favorite {
        display: none;
        width: 40%;
        padding: 0;
      }
    }

    .favorite_title {
      font-size: 2.5rem;

      &.mobile {
        display: block;
        border: 2px solid $main-color;
        text-align: center;
        background-color: $opacity-light-color;
        margin-bottom: 2%;
      }
    }
  }
}
</style>