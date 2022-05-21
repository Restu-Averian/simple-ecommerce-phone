<template>
  <div class="my-4">
    <div class="center examplex">
      <Alert type="error" show-icon v-if="kalauError !== ''">
        <h3 class="subtitle is-5 is-size-6-mobile">{{ kalauError }}</h3>
      </Alert>

      <vs-table striped ref="dataTable">
        <template #thead>
          <vs-tr>
            <vs-th> No </vs-th>
            <vs-th> Devices </vs-th>
            <vs-th> Favourites </vs-th>
          </vs-tr>
        </template>

        <template #tbody>
          <vs-tr :key="i" v-for="(fans, i) in dataTopByFans" @click="detail(i)">
            <vs-td>
              {{ i + 1 }}
            </vs-td>
            <vs-td>
              {{ fans.phone_name }}
            </vs-td>
            <vs-td>
              <i class="bx bxs-heart" style="color: red"></i
              >{{ fans.favorites }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataTopByFans: [],
      kalauError: "",
    };
  },
  methods: {
    fetchTopByFans() {
      let loading = this.$vs.loading({
        text: "Sedang mengambil data barang, mohon tunggu sebentar...",
        target: this.$refs.dataTable,
      });
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/top-by-fans")
        .then((result) => {
          this.dataTopByFans = result.data.data.phones;
          loading.close();
        })
        .catch((error) => {
          if (error.response.data.status == false) {
            this.kalauError =
              "Maaf, request terhadap data terlalu banyak, mohon untuk tidak menggunakan web ini sekitar 1 menit";
          } else {
            this.kalauError = "";
          }
          console.log("Error di table: ", error.response.data);
        });
    },
    detail(index) {
      console.log("tes : ", this.dataTopByFans);
      this.$router.push(
        `/home/${this.dataTopByFans[index].slug}/${this.dataTopByFans[index].slug}`
      );
    },
  },
  mounted() {
    this.fetchTopByFans();
  },
};
</script>

<style>
.vs-table__th:nth-child(1) {
  width: 100px;
}
.vs-table__tr:nth-child(1) {
  font-size: 50px;
}
.vs-table table {
  width: 10%;
}
</style>