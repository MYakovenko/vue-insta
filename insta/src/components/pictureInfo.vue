<template>
  <div class="wrapper">
    <!-- <p>{{id}}</p> -->
    <div class="pictureInfo">
      <div class="pictureInfo__back" @click="goBack">
        <div class="pictureInfo__back-text">Back to search</div>
      </div>
      <p class="loader" v-if="loading">Loading...</p>
      <div v-else>
        <section class="pictureInfo__container">
          <div class="pictureInfo__img-container">
            <img class="pictureInfo__img" :src="imageUrl" :alt="imageInfo.title._content" />
          </div>
          <h1 class="pictureInfo__title">{{imageInfo.title._content}}</h1>
          <p class="pictureInfo__owner">By {{imageInfo.owner}}</p>
          <h2 class="pictureInfo__description-title">Description</h2>
          <p class="pictureInfo__description-info">{{imageInfo.description._content }}</p>

          <section class="pictureInfo__date-view-wrapper">
            <p class="pictureInfo__date">{{imageInfo.dates.taken}}</p>
            <p class="pictureInfo__views">Views: {{imageInfo.views}}</p>
          </section>
        </section>
        <section class="recent-photos">
          <h1 class="recent-photos__title">Recently added photos</h1>
          <div class="recent-photos__pictures">
            <picture-card
              v-for="photo in recentPhoto"
              :key="photo.id"
              :id="photo.id"
              :datetaken="photo.datetaken"
              :title="photo.title"
              :url="photo.url_n"
              :views="photo.views"
              :ownername="photo.ownername"
            ></picture-card>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PictureCard from "./pictureCard.vue";

export default {
  name: "pictureInfo",
  props: {
    id: String
  },
  // data() {
  //   return {
  //     id: this.$route.params.id
  //   };
  // },
  components: {
    PictureCard
  },
  created(id) {
    this.$store.commit("loading");
    this.$store.dispatch("getImageUrl", this.id);
    this.$store.dispatch("getImageInfo", this.id);
    this.$store.dispatch("getRecentPhoto");
  },
  watch: {
    id: function(newId) {
      this.$store.commit("loading");
      this.$store.dispatch("getImageUrl", newId);
      this.$store.dispatch("getImageInfo", newId);
      this.$store.dispatch("getRecentPhoto");
    }
  },
  computed: {
    ...mapState({
      searchText: state => state.searchText,
      imageUrl: state => state.imageUrl,
      imageInfo: state => state.imageInfo,
      loading: state => state.loading,
      recentPhoto: state => state.recentPhoto
    })
  },
  methods: {
    goBack() {
      this.$store.dispatch("getPictures", this.searchText);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/utils/vars";

.pictureInfo {
  max-width: 1200px;
  margin: 0 auto;
  background-color: $default-color;
  padding: 2%;

  &__back {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 25%;
    border-bottom: 2px solid transparent;
    padding: 0 2.5%;
    cursor: pointer;
    transition: width 0.5s ease-in-out;

    &:hover {
      border-bottom: 2px solid $main-color;
      transition: width 0.5s ease-in-out;
      width: 40%;
    }
  }

  &__back-text {
    font-size: 3rem;
    color: $main-color;
    font-family: Chewy;
    font-weight: 600;
    margin-left: 2%;
  }

  &__img-container {
    position: relative;
  }

  &__button {
    position: absolute;
    bottom: 7%;
    right: 2%;
  }

  &__img {
    border-radius: 5px 5px 0 0;
    width: 100%;
    height: 600px;
    object-fit: cover;
    margin: 3% 0;
  }

  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 1%;
    padding: 0 2%;
  }

  &__owner {
    margin-top: 0;
    font-size: 1.3rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 3%;
    padding: 0 2%;
  }

  &__description-title {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 2%;
  }

  &__description-info {
    font-size: 1.4rem;
    padding: 0 2%;
  }

  &__date-view-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 3%;
    padding: 0 2%;
  }

  &__date,
  &__views {
    margin-bottom: 0;
    font-size: 1.3rem;
    font-weight: bold;
  }

  &__date {
    margin-right: 5%;
  }

  .recent-photos {
    width: 100%;
    margin-top: 5%;
    border: 1px solid $main-color;
    border-radius: 10px;

    &__title {
      font-size: 2.5rem;
      font-weight: bold;
      font-family: Chewy;
      color: $main-color;
      margin: 2% 0;
      text-align: center;
    }

    &__pictures {
      width: 90%;
      min-height: 200px;
      margin: 0 auto;
      margin-bottom: 2%;

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}

@media (max-width: $tableWidth) {
  .pictureInfo {
    &__back {
      width: 33%;
    }

    &__back-text {
      font-size: 2.5rem;
    }

    &__img {
      height: 400px;
    }

    &__title {
      font-size: 1.5rem;
      margin-bottom: 0;
    }

    &__owner {
      font-size: 1.1rem;
    }

    &__description-title {
      font-size: 1.4rem;
    }

    &__description-info {
      font-size: 1.1rem;
    }

    &__date,
    &__views {
      font-size: 1.1rem;
    }

    .recent-photos {
      &__pictures {
        width: 100%;
      }
    }
  }

  @media (max-width: $phoneWidth) {
    .pictureInfo {
      &__back {
        width: 50%;
      }

      &__back-text {
        font-size: 2rem;
      }

      &__img {
        height: 200px;
      }

      &__title {
        font-size: 1.3rem;
        margin-bottom: 0;
      }

      &__owner {
        font-size: 1rem;
      }

      &__description-title {
        font-size: 1.3rem;
      }

      &__description-info {
        font-size: 1rem;
      }

      &__date,
      &__views {
        font-size: 1rem;
      }

      .recent-photos {
        &__title {
          font-size: 1.7rem;
        }

        &__pictures {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}
</style>