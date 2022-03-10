<template>
  <div class="bg-light">
    <nav-component></nav-component>
    <div class="container p-5 text-center mt-5" v-show="!loggedIn">
      <span class="h1 text-danger">
        Не сте автентицирани за да имате пристап до оваа страна
      </span>
    </div>
    <div class="container p-5 mt-5" v-show="loggedIn">
      <div class="row bg-white p-5 rounded">
        <div class="col-lg-6">
          <img class="img-fluid" :src="product.imageUrl" />
          <label>Внесете url за слика на производот</label>
          <input
              type="text"
              class="form-control my-auto"
              placeholder="Внесете url за слика на производот"
              v-model="product.imageUrl"
          />
        </div>
        <div class="col-lg-6">
          <div class="row">
            <div class="col-lg-12">
              <label>Внесете име на производот</label>
              <input
                placeholder="Внесете име на производот"
                type="text"
                v-model="product.name"
                class="form-control my-auto"
              />
            </div>
            <div class="col-lg-12 mt-5">
              <label>Внесете цена на производот</label>
              <input
                placeholder="Внесете цена на производот"
                type="text"
                v-model="product.price"
                class="form-control my-auto"
              />
            </div>

            <div class="col-lg-12 mt-5">
              <label for="type">Одберете категорија на производ</label>
              <select
                id="type"
                v-model="product.type"
                class="custom-select form-control"
              >
                <option v-for="type in types" :key="type.id" :value="type.name">
                  {{ type.cyrilicName }}
                </option>
              </select>
            </div>

            <div class="col-lg-12 mt-5">
              <small class="text-primary"
                >Ова нема да се прикажува на купувачите</small
              ><br/>
              <label>Внесете залиха на производот</label>
              <input
                placeholder="Внесете залиха на производот"
                type="text"
                v-model="product.quantity"
                class="form-control my-auto"
              />
            </div>
            <div class="col-lg-12 mt-5">
              <label>Внесете попуст на производот</label>
              <input
                placeholder="Внесете попуст на производот"
                type="text"
                v-model="product.sale"
                class="form-control my-auto"
              />
            </div>
            <div class="col-lg-12">
              <button
                @click="modifyProduct()"
                class="mt-5 btn btn-lg btn-primary rounded"
              >
                Зачувај
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Nav from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import ProductService from "@/repositories/productsRepository";
import TypeService from "@/repositories/typesRepository";
export default {
  props: {
    id: {
      default: "",
    },
  },
  data() {
    return {
      changeName: true,
      changeType: true,
      changeCollection: true,
      changeQuantity: true,
      changePrice: true,
      product: {},
      types: [],
    };
  },
  methods: {
    modifyProduct() {
      console.log(this.product);
      ProductService.edit(this.product.id,{
        price: this.product.price,
        name: this.product.name,
        type: this.getTypeId(this.product.type),
        quantity: this.product.quantity,
        imageUrl: this.product.imageUrl,
        sale: this.product.sale,
        sold: this.product.sold,
      }).then(()=>{
        alert("Успешно променет производ!")
        this.$router.push("/");
      });
    },
    getTypeId(name) {
      if(name === "DOGS") return 0;
      else if(name === "CATS") return 1;
      else if(name === "RODENTS") return 2;
      else if(name === "BIRDS") return 3;
      else if(name === "AQUA") return 4;
    },
    loadProduct() {
      ProductService.details(this.id).then((response) => {
        this.product = response.data;
        console.log(this.product);
      })
    },
    getCyrilicName(name) {
      if(name === "DOGS") return "Кучиња";
      else if(name === "CATS") return "Мачиња";
      else if(name === "RODENTS") return "Глодари";
      else if(name === "BIRDS") return "Птици";
      else if(name === "AQUA") return "Акваристика";
    },
    addCyrilicName() {
      this.types.forEach(v => {
        v.cyrilicName = this.getCyrilicName(v.name);
      })
    },
    loadTypes() {
      TypeService.allTypes().then(response => {
      this.types = response.data.map((v, i) => {return {
          name: v,
          id: i
        }});
        this.selectedType = this.types[0];
        this.addCyrilicName();
    }).catch(e => { console.log(e) })
    }
  },
  mounted() {
    this.loadTypes();
    this.loadProduct();
  },
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  components: {
    "nav-component": Nav,
    "footer-component": Footer,
  },
};
</script>