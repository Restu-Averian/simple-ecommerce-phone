<template>
  <section>
    <Divider
      ><h1 class="title is-3 is-size-4-mobile">
        Top by Interests and Fans
      </h1></Divider
    >
    <Tabs value="name1" class="my-6">
      <TabPane label="Top by Interests" name="name1">
        <div class="has-text-left">
          <vs-table striped>
            <template #thead>
              <vs-tr>
                <vs-th> No </vs-th>
                <vs-th> Devices </vs-th>
                <vs-th> Favourites </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                :key="i"
                v-for="(interest, i) in dataTopByInterests"
                @click="detail(i)"
              >
                <vs-td>
                  {{ i + 1 }}
                </vs-td>
                <vs-td>
                  {{ interest.phone_name }}
                </vs-td>
                <vs-td>
                  <i class="bx bxs-heart" style="color: red"></i>
                  {{ interest.hits }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </TabPane>
      <TabPane label="Top by Fans" name="name2">
        <top-by-fans class="has-text-left" />
      </TabPane>
    </Tabs>
  </section>
</template>

<script>
import axios from "axios";
import TopByFans from "./TopByFans.vue";
export default {
  components: { TopByFans },
  data() {
    return {
      dataTopByInterests: [],
    };
  },
  methods: {
    fetchTopByInterests() {
      axios
        .get("https://api-mobilespecs.azharimm.site/v2/top-by-interest")
        .then((result) => {
          this.dataTopByInterests = result.data.data.phones;
        });
    },
    detail(index) {
      console.log("tes : ", this.dataTopByInterests);
      this.$router.push(
        `/home/${this.dataTopByInterests[index].slug}/${this.dataTopByInterests[index].slug}`
      );
    },
  },
  mounted() {
    this.fetchTopByInterests();
  },
};
</script>