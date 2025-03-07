<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  header: {
    type: Object,
    required: false,
    default: () => null
  },
  fields: {
    type: Array,
    required: true,
    default: () => []
  },
  rowSelector: {
    type: Boolean,
    required: false,
    default: false
  }
});

const emit = defineEmits(['rowSelected']);

const rowSelected = (item) => {
  emit('rowSelected', item);
};

const selectAll = (e) => {
  const checked = e.target.checked;
  props.data.forEach((item) => { item.selected = checked });
};

const hasNamedSlot = (slots, slotName) => {
  return computed(() => Object.prototype.hasOwnProperty.call(slots, slotName));
};
</script>

<template>
  <div>
    <div v-if="header">
      <h2>
        {{ header.title }}
      </h2>
      <p>
        {{ header.description }}
      </p>
    </div>
    <table>
      <thead>
        <tr>
          <th
            v-if="rowSelector"
          >
            <div>
              <input
                id="contact-selectAll"
                type="checkbox"
                value=""
                @change="selectAll"
              >
            </div>
          </th>
          <th
            v-for="(item, idx) in fields"
            :key="idx"
          >
            {{ item.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td v-if="rowSelector">
            <div>
              <input
                :id="`contact-${index}`"
                v-model="item.selected"
                type="checkbox"
              >
            </div>
          </td>
          <td
            v-for="(field, idx) in fields"
            :key="idx"
            @click="rowSelected(item)"
          >
            <span v-if="!hasNamedSlot(field.key)" :item="item">
              {{ item[field.key] }}
            </span>
            <slot v-else :name="field.key" :item="item" />
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-if="hasNamedSlot('footer')">
      <slot name="footer" />
    </div>
</template>