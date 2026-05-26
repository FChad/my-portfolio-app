<script setup lang="ts">
interface Props {
    id: string
    label: string
    modelValue: string
    type?: 'text' | 'email' | 'textarea'
    placeholder?: string
    autocomplete?: string
    required?: boolean
    error?: string
    rows?: number
}

const props = withDefaults(defineProps<Props>(), {
    type: 'text',
    autocomplete: 'off',
    rows: 5,
})

defineEmits<{ 'update:modelValue': [value: string] }>()

const baseClass = 'w-full px-3 py-2.5 md:px-4 md:py-3 rounded-xl md:rounded-2xl border text-sm md:text-base bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 outline-none transition-all'
const okClass = 'border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-accent focus:border-transparent'
const errClass = 'border-red-300 focus:ring-2 focus:ring-red-500 focus:border-transparent'

const inputClass = computed(() => [baseClass, props.error ? errClass : okClass, props.type === 'textarea' ? 'resize-none' : ''])
</script>

<template>
    <div class="flex flex-col gap-1.5 md:gap-2">
        <label :for="id" class="block text-xs md:text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {{ label }}<span v-if="required"> *</span>
        </label>
        <textarea v-if="type === 'textarea'" :id="id" :value="modelValue" :rows="rows" :autocomplete="autocomplete"
            :placeholder="placeholder" :class="inputClass"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)" />
        <input v-else :id="id" :type="type" :value="modelValue" :autocomplete="autocomplete"
            :placeholder="placeholder" :class="inputClass"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
        <p v-if="error" class="text-xs md:text-sm text-red-600 dark:text-red-400">{{ error }}</p>
    </div>
</template>
