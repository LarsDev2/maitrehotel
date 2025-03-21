import { index, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/sidebars.jsx", { id: "leftsidebar" }, [
        index("routes/index.jsx"), // Always show table selection
    ]),
];
