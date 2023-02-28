<template>
    <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(item, key) in orders" :key="key">
        <tr v-if="orders.length" :class="{ 'text-secondary': !item.is_paid }">
          <td>{{ item.create_at }}</td>
          <td><span v-text="item.user.email" v-if="item.user"></span></td>
          <td>
            <ul class="list-unstyled">
              <li v-for="(product, i) in item.products" :key="i">
                {{ product.product.title }} 數量：{{ product.qty }}
                {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${item.id}`"
                v-model="item.is_paid"
                @change="updatePaid(item)"
              />
              <label class="form-check-label" :for="`paidSwitch${item.id}`">
                <span v-if="item.is_paid">已付款</span>
                <span v-else>未付款</span>
              </label>
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(item)"
              >
                檢視
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrderModal(item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
  <order-modal
            :temp-order="tempOrder"
            :update-paid="updatePaid"
          ></order-modal>
  </div>
  <div
        id="delOrderModal"
        ref="delOrderModal"
        class="modal fade"
        tabindex="-1"
        aria-labelledby="delOrderModalLabel"
        aria-hidden="true"
      >
        <!-- html標籤沒有大寫，遇要加-改為小寫去做轉換 -->
        <del-order-modal
          :temp-order="tempOrder"
          :delete-order="deleteOrder"
        ></del-order-modal>
      </div>
</template>

<script>
import { Modal } from 'bootstrap'
import OrderModal from '@/components/OrderModal.vue'
import DelOrderModal from '@/components/DelOrderModal.vue'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      orders: {},
      tempOrder: {},
      orderModal: {},
      delOrderModal: {}
    }
  },
  components: {
    OrderModal,
    DelOrderModal
  },
  methods: {
    getAllOrders () {
      this.$http.get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders`)
        .then((res) => {
          this.orders = res.data.orders
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteOrder () {
      this.$http.delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`)
        .then((res) => {
          this.delOrderModal.hide()
          this.getAllOrders()
        })
        .catch(error => {
          console.log(error)
        })
    },
    updatePaid () {
      const api = `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${this.tempOrder.id}`
      const paid = {
        is_paid: this.tempOrder.is_paid
      }
      this.$http.put(api, { data: paid }).then((response) => {
        this.getAllOrders()
        this.orderModal.hide()
      }).catch((error) => {
        this.$httpMessageState(error.response, '錯誤訊息')
      })
    },
    hide () {
      this.orderModal.hide()
    },
    openModal (item) {
      this.tempOrder = { ...item }
      this.orderModal = new Modal(document.querySelector('#orderModal'))
      this.orderModal.show()
    },
    openDelOrderModal (item) {
      this.tempOrder = { ...item }
      this.delOrderModal = new Modal(document.querySelector('#delOrderModal'))
      this.delOrderModal.show()
    }
  },
  mounted () {
    // const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschoolToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

    // this.$http.defaults.headers.common.Authorization = token

    // this.checkAdmin()
    this.getAllOrders()
  }
}
</script>
