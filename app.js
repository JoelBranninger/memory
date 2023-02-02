const app = Vue.createApp({
    created() {
        this.$store.state.images.sort(() => 0.5 - Math.random());
    }
})
const state = {
    images: [
        { show: false, img: "img/pizza1.svg", name: "pizza", rotate: "rotateY(0deg)" },
        { show: false, img: "img/pizza2.svg", name: "pizza", rotate: "rotateY(0deg)" },
        { show: false, img: "img/salad1.svg", name: "salad", rotate: "rotateY(0deg)" },
        { show: false, img: "img/salad2.svg", name: "salad", rotate: "rotateY(0deg)" },
        { show: false, img: "img/hamburger1.svg", name: "hamburger", rotate: "rotateY(0deg)" },
        { show: false, img: "img/hamburger2.svg", name: "hamburger", rotate: "rotateY(0deg)" }
    ],
    show1: "",
    prevCard: "",
    readyToRun: true,
}
const mutations = {
    increment(state, image) {
        if (state.readyToRun === true) {
            if (state.show1 === "") {
                image.show = true
                state.show1 = image.name
                image.rotate = "rotateY(180deg)"
                state.prevCard = image
            } else if (image.name === state.show1) {
                image.rotate = "rotateY(180deg)"
                image.show = true
                state.show1 = ""
            } else {
                image.show = true
                state.show1 = ""
                state.readyToRun = false
                image.rotate = "rotateY(180deg)"
                let card1 = state.images.find(card => card.img === state.prevCard.img)
                setTimeout(function () {
                    image.rotate = "rotateY(0deg)"
                    card1.rotate = "rotateY(0deg)"
                }, 1000);
                setTimeout(function () {
                    image.show = false
                    card1.show = false
                    state.prevCard = ""
                    state.readyToRun = true
                }, 2000);
            }
        }
    },
}
const store = Vuex.createStore({
    data() {
        return {
            show1: "",
            prevCard: ""
        }
    },
    mutations, state
})
app.use(store)
app.component("card", {
    template:
        `
            <div v-for='image in $store.state.images'  @click="$store.commit('increment', image)" class='card'>
                <div class="inner-card" :style="{transform: image.rotate}">
                    <div class="card-back">
                        <img :src='image.img' v-if='image.show' alt='image of food' class='food-img'>
                    </div>
                </div>
            </div>
      `

})
app.mount("#app")
