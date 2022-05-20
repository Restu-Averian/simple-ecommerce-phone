<template>
  <section class="my-6" ref="deskripsi">
    <vs-table>
      <template #tbody>
        <!-- Released Date -->
        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Released Date
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(rdate, i) in dataDetail.specifications[1].specs"
              :key="i"
            >
              <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                {{ rdate.key }}
              </h4>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(rdate, i) in dataDetail.specifications[1].specs"
              :key="i"
            >
              <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                {{ rdate.val[0] }}
              </p></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Platform -->
        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Platform
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlPlatform, i) in dataDetail.specifications[4].specs"
              :key="i"
            >
              <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                {{ jdlPlatform.key }}
              </h4>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(platform, i) in dataDetail.specifications[4].specs"
              :key="i"
            >
              <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                {{ platform.val[0] }}
              </p></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Memory -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Memory
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlMemory, i) in dataDetail.specifications[5].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlMemory.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(memory, i) in dataDetail.specifications[5].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ memory.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Main Camera -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Main Camera
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlMainCamera, i) in dataDetail.specifications[6].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlMainCamera.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(mainCamera, i) in dataDetail.specifications[6].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ mainCamera.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Selfie Camera  -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Selfie Camera
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlSelfieCamera, i) in dataDetail.specifications[7].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlSelfieCamera.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(selfieCamera, i) in dataDetail.specifications[7].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ selfieCamera.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Display -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Display
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlDisplay, i) in dataDetail.specifications[3].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlDisplay.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(display, i) in dataDetail.specifications[3].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ display.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Battery -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Battery
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlBattery, i) in dataDetail.specifications[11].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlBattery.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(battery, i) in dataDetail.specifications[11].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ battery.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>

        <!-- Network -->

        <vs-tr>
          <vs-td>
            <h2 class="title is-4 has-text-info has-text-left is-size-6-mobile">
              Network
            </h2>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(jdlNetwork, i) in dataDetail.specifications[0].specs"
              :key="i"
            >
              <vs-td>
                <h4 class="title is-5 has-text-left mb-3 is-size-7-mobile">
                  {{ jdlNetwork.key }}
                </h4>
              </vs-td>
            </vs-tr>
          </vs-td>
          <vs-td>
            <vs-tr
              v-for="(network, i) in dataDetail.specifications[0].specs"
              :key="i"
            >
              <vs-td>
                <p class="subtitle has-text-left is-6 mb-3 is-size-7-mobile">
                  {{ network.val[0] }}
                </p>
              </vs-td></vs-tr
            >
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </section>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dataDetail: [],
      loadingFetching: false,
    };
  },
  methods: {
    fetchDataDetail() {
      const loading = this.$vs.loading({
        text: "Mohon tunggu sebentar, sedang mengambil data...",
        target: this.$refs.deskripsi,
      });
      axios
        .get(
          `https://api-mobilespecs.azharimm.site/v2/${this.$route.params.detail}`
        )
        .then((response) => {
          console.log("hasil : ", response.data.data);
          this.dataDetail = response.data.data;
          loading.close();
        });
    },
  },
  mounted() {
    this.fetchDataDetail();
  },
};
</script>

<style>
</style>