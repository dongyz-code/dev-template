import { defineComponent } from 'vue';
import type { PropType, RendererNode } from 'vue';

const JsxRender = defineComponent({
  name: 'JsxRender',
  props: {
    nodes: {
      type: [Array, Object] as PropType<RendererNode | RendererNode[]>,
      required: true,
    },
  },

  setup(props) {
    return () => {
      return props.nodes;
    };
  },
});

export default JsxRender;
