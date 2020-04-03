<template>
  <div class="container-scroller">
    <div class="container-fluid page-body-wrapper">
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title float-left">
                    <b>Data Siswa</b>
                  </p>
                  <p class="card-description float-right">
                    <b-button variant="success" v-b-modal.modalTatib v-on:click="Add">
                      <i class="mdi mdi-plus btn-icon-prepend"></i> Add Activity
                    </b-button>
                  </p>
                  <div class="table-responsive">
                    <!-- CRUD DATA -->
                    <b-table striped hover :items="daily_scrum" :fields="fields">
                      <template v-slot:cell(aksi)="data">
                        <!-- <b-button
                      size="sm"
                      variant="info"
                      v-on:click="Edit(data.item)"
                      v-b-modal.modalTatib
                    >
                      <i class="mdi mdi-pencil btn-icon-prepend"></i> Ubah
                        </b-button> -->
                        &nbsp;
                        <!-- <b-button class="btn btn-warning" size="sm" variant="danger" v-on:click="Drop(data.item.id)">
                          <i class="mdi mdi-delete btn-icon-prepend">HAPUS</i>
                          <span class="glyphicon glyphicon-trash ">HAPUS</span>
                        </b-button> -->
                          <b-button size="sm" variant="danger" v-on:click="Drop(data.item.id)">
                      <i class="mdi mdi-delete btn-icon-prepend"></i> 
                    </b-button>
                      </template>
                    </b-table>

                    <b-pagination
                      v-model="currentPage"
                      :per-page="perPage"
                      :total-rows="rows"
                      align="center"
                      v-on:input="pagination"
                    ></b-pagination>

                    <b-toast id="loadingToast" title="Processing Data" no-auto-hide>
                      <b-spinner label="Spinning" variant="success"></b-spinner>
                      <strong class="text-success">Loading...</strong>
                    </b-toast>

                    <!-- toast untuk tampilan message box -->
                    <b-toast id="message" title="Message">
                      <strong class="text-success">{{ message }}</strong>
                    </b-toast>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="modal fade"
          id="modalDailyScrum"
          tabindex="-1"
          role="dialog"
          aria-labelledby="ModalLabel"
          aria-hidden="true"
        >
          <b-modal id="modalTatib" @ok="Save">
            <template v-slot:modal-title>Add Activity</template>
            <form ref="form">
              <div class="form-group">
                <label for="team" class="col-form-label">Your Team</label>
                <select
                  class="form-control"
                  name="team"
                  id="team"
                  v-model="team"
                  placeholder="Team"
                >
                  <option value="DDS">DDS</option>
                  <option value="BEON">BEON</option>
                  <option value="DOT">DOT</option>
                  <option value="node1">Node 1</option>
                  <option value="node2">Node 2</option>
                  <option value="react1">React 1</option>
                  <option value="react2">React 2</option>
                  <option value="laravel">Laravel</option>
                  <option value="laravel_vue" checked>Laravel Vue</option>
                  <option value="android">Android</option>
                </select>
              </div>

              <div class="form-group">
                <label for="activity_yesterday" class="col-form-label">Yesterday Activity</label>
                <input
                  type="text"
                  name="activity_yesterday"
                  class="form-control"
                  id="activity_yesterday"
                  placeholder="Yesterday Activity"
                  v-model="activity_yesterday"
                />
              </div>
              <div class="form-group">
                <label for="activity_today" class="col-form-label">Today Activity</label>
                <input
                  type="text"
                  name="activity_today"
                  class="form-control"
                  id="activity_today"
                  placeholder="Today Activity"
                  v-model="activity_today"
                />
              </div>
              <div class="form-group">
                <label for="problem_yesterday" class="col-form-label">Yesterday Problem</label>
                <input
                  type="text"
                  name="problem_yesterday"
                  class="form-control"
                  id="problem_yesterday"
                  placeholder="Yesterday Problem"
                  v-model="problem_yesterday"
                />
              </div>
              <div class="form-group">
                <label for="solution" class="col-form-label">Your Solution</label>
                <input
                  type="text"
                  name="solution"
                  class="form-control"
                  id="solution"
                  placeholder="Your Solution"
                  v-model="solution"
                />
              </div>
            </form>
          </b-modal>
        </div>

        <!-- content-wrapper ends -->
        <!-- partial:partials/_footer.html -->
        <footer class="footer">
          <div class="w-100 clearfix">
            <span
              class="text-muted d-block text-center text-sm-left d-sm-inline-block"
            >Copyright © 2020 Moklet. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              Tugas PJJ Moklet & Made With
              <i class="mdi mdi-heart-outline text-danger"></i>
            </span>
          </div>
        </footer>
        <!-- partial -->
      </div>
      <!-- main-panel ends -->
    </div>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      search: "",
      tanggal: "",
      id_users: "",
      activity_yesterday: "",
      activity_today: "",
      problem_yesterday: "",
      solution: "",
      team: "",
      action: "",
      message: "",
      currentPage: 1,
      rows: 0,
      perPage: 10,
      key: "",
      daily_scrum: [],
      fields: ["tanggal", "activity_yesterday", "activity_today", "problem_yesterday", "solution", "aksi"]
    };
  },

  methods: {
    getData: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      let offset = (this.currentPage - 1) * this.perPage;
      this.$bvToast.show("loadingToast");
      this.axios
        .get("/dailyscrum/" + this.perPage + "/" + offset, conf)
        .then(response => {
          if (response.data.status == 1) {
            this.$bvToast.hide("loadingToast");
            this.daily_scrum = response.data.daily_scrum;
            this.rows = response.data.count;
          } else {
            this.$bvToast.hide("loadingToast");
            this.message = "Yahh.. Datanya gagal ditampilin nih...";
            this.$bvToast.show("message");
            this.$router.push({ name: "login" });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    pagination: function() {
      if (this.search == "") {
        this.getData();
      } else {
        this.searching();
      }
    },

    Add: function() {
      this.action = "insert";
      this.team = "";
      this.id_user = "";
      //   this.tanggal = "";
      this.activity_yesterday = "";
      this.activity_today = "";
      this.problem_yesterday = "";
      this.solution = "";
    },

    // Edit: function(item) {
    //   this.action = "update";
    //   this.tanggal = item.id;
    //   this.yesterday = item.activity_yesterday;
    //   this.today = item.activity_today;
    //   this.problem = item.problem_yesterday;
    //   this.solution = item.solution;
    // },

    Save: function() {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      this.$bvToast.show("loadingToast");
      if (this.action === "insert") {
        let form = new FormData();
        form.append("tanggal", this.tanggal);
        form.append("id_users", this.id_users);
        form.append("team", this.team);
        form.append("activity_yesterday", this.activity_yesterday);
        form.append("activity_today", this.activity_today);
        form.append("problem_yesterday", this.problem_yesterday);
        form.append("solution", this.solution);

        // form.append("id", this.id);
        // form.append("nis", this.nis);
        // form.append("nama_siswa", this.nama_siswa);
        // form.append("kelas", this.kelas);

        this.axios
          .post("/dailyscrum", form, conf)
          .then(response => {
            this.$bvToast.hide("loadingToast");
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        let form = {
          tanggal: this.tanggal,
          activity_yesterday: this.activity_yesterday,
          activity_today: this.activity_today,
          problem_yesterday: this.problem_yesterday,
          solution: this.solution
        };
        this.axios
          .put("/dailyscrum/" + this.id, form, conf)
          .then(response => {
            this.$bvToast.hide("loadingToast");
            if (this.search == "") {
              this.getData();
            } else {
              this.searching();
            }
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      }
    },

    Drop: function(id) {
      let conf = { headers: { Authorization: "Bearer " + this.key } };
      if (confirm("Yakin ingin menghapus data ini?")) {
        this.$bvToast.show("loadingToast");
        this.axios
          .delete("/dailyscrum/" + id, conf)
          .then(response => {
            this.getData();
            this.$bvToast.hide("loadingToast");
            this.message = response.data.message;
            this.$bvToast.show("message");
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  },
  mounted() {
    this.key = localStorage.getItem("Authorization");
    this.getData();
  }
};
</script>

<style>
</style>