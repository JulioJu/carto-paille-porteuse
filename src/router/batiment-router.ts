const BatimentShape = () => import("@/batiment/BatimentShape.vue");

const BatimentUpdate = () => import("@/batiment//BatimentUpdate.vue");

export default {
  path: "/",
  component: BatimentShape,
  children: [
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
