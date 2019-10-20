<template>
  <div class="picture" @click="openPictureInfo(id)">
    <!-- <Link to={{ pathname: `/item/${id}` }} className="picture"> -->
    <!-- <router-link to="/item/"> -->
    <img
      class="picture__img"
      :src="url"
      :id="id"
      :alt="title"
      @mouseover="hover=true"
      @mouseleave="hover=false"
    />
    <div class="picture__card-body" v-if="hover">
      <p class="picture__title">{{title}}</p>
      <p class="picture__owner-name">By {{ownername}}</p>
      <section class="picture__date-view-wrapper">
        <p class="picture__date">{{datetaken}}</p>
        <p class="picture__views">Views: {{views}}</p>
      </section>
    </div>
    <!-- </router-link> -->
    <!-- </Link> -->
  </div>
</template>

<script>
export default {
  name: "pictureCard",
  props: {
    id: String,
    datetaken: String,
    title: String,
    url: String,
    views: String,
    ownername: String
    // onClick: Function
  },
  data() {
    return {
      hover: false
    };
  },
  methods: {
    openPictureInfo(id) {
      console.log("open", id);
      this.$router.push({ name: "pictureInfo", params: { id: id } });
    }
  }
};
</script>

<style lang="scss">
@import "../scss/utils/vars";

.picture {
  position: relative;
  margin: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  display: block;
  // width: 95%;

  &__img {
    border-radius: 5px;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &__close-icon {
    display: none;
  }

  &__card-body {
    // display: none;
    width: 100%;
    background-color: $default-color;
    padding: 0.5rem 1rem 1rem;
    border-radius: 0 0 5px 5px;
    position: absolute;
    bottom: 0;
    left: 0;
    color: $main-color;
  }

  &__title {
    font-size: 1.3rem;
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__owner-name {
    margin-top: 0;
    font-size: 1.1rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  &__date-view-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3%;
  }

  &__date,
  &__views {
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  // &:hover {
  //   .picture__card-body {
  //     display: block;
  //   }
  // }
}

@media (max-width: $tableWidth) {
  .picture {
    &__img {
      height: 250px;
    }
    &__card-body {
      display: block;
    }
  }
}
</style>