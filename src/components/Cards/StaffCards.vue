<template>

<div class="wrapper">
  <div class="card" v-for="item in data.data" :key="item.id">
    <img src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image">
    <p class="card__name">{{ item.title }}</p>
    <div class="grid-container">
      <div class="grid-child-posts">
        {{ item.id }}
      </div>

      <div class="grid-child-followers">
        {{ item.completed }}
      </div>
    </div>
    <div class="buttons">
      <button data-toggle="modal" data-target="#staffEdit" id="edit" class="btn draw-border">Edit</button>
      <button class="btn draw-border">Delete</button>
    </div>
    
    <div class="modal fade" id="staffEdit" tabindex="-1" role="dialog" aria-labelledby="productEditTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Edit staff</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <form>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                </div>
                </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createProduct()" type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: 'WaitersCards',
  data() {
    return {
      data: ''
    };
  },
  mounted() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then(response => (this.data = response))
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Baloo+Paaji+2:wght@400;500&display=swap");

.wrapper {
    display: flex;
    flex-wrap: wrap;
}

.card {
    width: 21%;
    margin: 2%;
    height: 24.5rem;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(87deg, rgba(45, 206, 137, .7) 0, rgba(45, 206, 204, .7) 100%) !important;
    color: white;
}

.card__name {
  margin-top: 15px;
  font-size: 1.5em;
}

.card__image {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-top: 20px;
}


.draw-border {
  box-shadow: inset 0 0 0 2px white;
  color: #58afd1;
  transition: color 0.25s 0.0833333333s;
  position: relative;
}

.draw-border::before,
.draw-border::after {
  border: 0 solid transparent;
  box-sizing: border-box;
  content: '';
  pointer-events: none;
  position: absolute;
  width: 0rem;
  height: 0;
  bottom: 0;
  right: 0;
}

.draw-border::before {
  border-bottom-width: 3px;
  border-left-width: 3px;
  border-radius: 5px;
}

.draw-border::after {
  border-top-width: 3px;
  border-right-width: 3px;
  border-radius: 5px;
}

.draw-border:hover {
  color: white;
}

.draw-border:hover::before,
.draw-border:hover::after {
  border-color: white;
  transition: border-color 0s, width 0.25s, height 0.25s;
  width: 100%;
  height: 100%;
}

.draw-border:hover::before {
  transition-delay: 0s, 0s, 0.25s;
}

.draw-border:hover::after {
  transition-delay: 0s, 0.25s, 0s;
}

.btn {
  background: none;
  border: none;
  cursor: pointer;
  line-height: 1.5;
  font: 700 1.2rem 'Roboto Slab', sans-serif;
  padding: 0.75em 2em;
  letter-spacing: 0.05rem;
  margin: .3em;
  width: 10rem;
  margin-top: 30px;
  color: white;
}

.buttons {
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn {
  width: 45%;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  font-size: 1.2em;
}

@media screen and (max-width: 1550px) {
    .card {
        width: 29.33%;
    }
}

@media screen and (max-width: 1550px) {
    .card {
        width: 46%;
    }
}

@media screen and (max-width: 620px) {
    .card {
        width: 100%;
    }
}

</style>