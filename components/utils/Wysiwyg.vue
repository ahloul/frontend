<template>
  <div class="editor">
    <client-only>
      <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
        <div class="menubar-wrapper">
          <ul class="menubar">
            <li>
              <div
                class="button cursor-pointer"
                :class="{ active: isActive.bold() }"
                @click.prevent="commands.bold"
              >
                <b>B</b>
              </div>
            </li>

            <li>
              <div
                class="button cursor-pointer"
                :class="{ active: isActive.italic() }"
                @click.prevent="commands.italic"
              >
                <i>I</i>
              </div>
            </li>

            <li>
              <div
                class="button cursor-pointer"
                :class="{ active: isActive.underline() }"
                @click.prevent="commands.underline"
              >
                <u>U</u>
              </div>
            </li>
          </ul>
        </div>
      </editor-menu-bar>

      <editor-content class="editor-content" :editor="editor" />
    </client-only>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Bold, Italic, Link, Underline } from 'tiptap-extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar,
  },
  props: {
    context: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data: () => ({
    editor: null,
  }),
  mounted() {
    this.editor = new Editor({
      extensions: [new Link(), new Bold(), new Italic(), new Underline()],
      content: this.context.model,
      onUpdate: ({ getHTML }) => {
        this.context.model = getHTML()
      },
    })
  },
  beforeDestroy() {
    if (!this.editor) return
    this.editor.destroy()
  },
}
</script>
<style lang="scss">
.menubar {
  &-wrapper {
    @apply;
  }
  @apply flex flex-wrap justify-start;
  &li {
    @apply flex-auto;
  }
}

.editor {
  &-content {
    @apply text-base border p-3 rounded-md bg-grey-lighter;
    &:focus {
      @apply shadow-none border-primary;
    }
  }
}
</style>
