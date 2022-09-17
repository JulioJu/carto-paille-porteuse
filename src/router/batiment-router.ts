const BatimentShape = () => import("@/batiment/BatimentShape.vue");

const BatimentUpdate = () => import("@/batiment/BatimentUpdate.vue");

const BatimentDetail = () => import("@/batiment/BatimentDetail.vue");

export default {
  path: "/",
  component: BatimentShape,
  children: [
    {
      path: "batiment/:batimentId/view",
      name: "BatimentDetail",
      component: BatimentDetail,
    },
    {
      path: "batiment/new",
      name: "BatimentCreate",
      component: BatimentUpdate,
    },
    {
      path: "batiment/:batimentId/edit",
      name: "BatimentEdit",
      component: BatimentUpdate,
    },
  ],
};
