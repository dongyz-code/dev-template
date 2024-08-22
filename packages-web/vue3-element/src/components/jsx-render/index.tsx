import { defineComponent } from 'vue';
import type { RendererNode } from 'vue';

const JsxRender = defineComponent({
  name: 'JsxRender',
  props: {
    nodes: {
      type: [Array, Object],
      required: true,
    },
  },

  setup(props: { nodes: RendererNode | RendererNode[] }) {
    return () => {
      return props.nodes;
    };
  },
});

export default JsxRender;
