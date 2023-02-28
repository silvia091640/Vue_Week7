<template>
   <div class="container">
        <div class="text-end mt-4">
          <button class="btn btn-primary" @click="openModal('create')">
            建立新的產品
          </button>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th width="100">是否啟用</th>
              <th width="120">編輯</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-end">{{ item.origin_price }}</td>
              <td class="text-end">{{ item.price }}</td>
              <td>
                <span class="text-success" v-if="item.is_enabled===1"
                  >啟用</span
                >
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-outline-primary btn-sm"
                    @click="openModal('edit',item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="openDeleteModal(item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
         <div
          id="productModal"
          class="modal fade"
          tabindex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <product-modal
            :temp-product="tempProduct"
            :save-product="saveProduct"
            :isNew="isNew"
          ></product-modal>
        </div>
        <div
        id="delProductModal"
        ref="delProductModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="delProductModalLabel"
        aria-hidden="true"
      >
        <!-- html標籤沒有大寫，遇要加-改為小寫去做轉換 -->
        <del-product-modal
          :temp-product="tempProduct"
          :delete-product="deleteProduct"
        ></del-product-modal>
      </div>
    </div>

</template>

<script>
// import { RouterLink } from 'vue-router'
import { Modal } from 'bootstrap'
import ProductModal from '@/components/ProductModal.vue'
import DelProductModal from '@/components/DelProductModal.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      tempProduct: {},
      products: [],
      productModal: {},
      delProductModal: {},
      isNew: false,
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DelProductModal
  },
  methods: {
    getAllProducts () {
      // this.isLoading = true,
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/all`)
        .then((res) => {
          this.products = res.data.products
          console.log(res.data.products)
          this.isLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProduct () {
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`)
        .then((res) => {
          this.delProductModal.hide()
          this.getAllProducts()
        })
        .catch(error => {
          console.log(error)
        })
    },
    saveProduct () {
      if (this.isNew) {
        this.$http.post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`, { data: this.tempProduct })
          .then((res) => {
            this.productModal.hide()
            this.getAllProducts()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$http.put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${this.tempProduct.id}`, { data: this.tempProduct })
          .then((res) => {
            this.productModal.hide()
            this.getAllProducts()
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    checkAdmin () {
      this.$http.post(`${VITE_APP_URL}/api/user/check`)
        .then(res => {
          this.getAllProducts()
        })
        .catch(error => {
          console.log(error)
          this.$router.push('/login')
        })
    },
    hide () {
      this.productModal.hide()
    },
    openModal (type, item) {
      this.isNew = type === 'create'
      if (type === 'edit') {
        this.tempProduct = { ...item }
      } else {
        this.tempProduct = { imagesUrl: [] }
      }
      this.productModal = new Modal(document.querySelector('#productModal'))
      this.productModal.show()
    },
    openDeleteModal (item) {
      this.tempProduct = { ...item }
      this.delProductModal = new Modal(document.querySelector('#delProductModal'))
      this.delProductModal.show()
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    this.$http.defaults.headers.common.Authorization = token

    this.checkAdmin()
    // this.getAllProducts()

    //   this.getCarts();
    //   this.isLoading = true;
    //   this.createProduct();
  }
}
</script>
