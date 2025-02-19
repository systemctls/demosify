<template>
  <div
    class="editor"
    :class="{
      'editor--shrink': isSidebarShown
    }"
  >
    <!-- 瀑布流模式 -->
    <template v-if="config.editorViewMode === 'waterfall'">
      <div
        class="editor-box"
        v-for="[type, content] in showBoxes"
        :key="type + content.key"
      >
        <header
          class="editor-boxName"
          :class="{
            'editor-boxName--folded': isSandboxFolded(type)
          }"
          @dblclick="toggleFold(type)"
        >
          <span class="editor-boxType">{{ type.toUpperCase() }}</span>
          <span class="editor-boxTransformer">{{ content.transformer }}</span>
        </header>
        <sandbox
          class="editor-sandbox"
          :is-folded="isSandboxFolded(type)"
          :value="content.code"
          :language="content.transformer"
          :editorHook="content.editorHook"
          :inputHook="content.inputHook"
          @input="codeUpdate(type, arguments)"
        ></sandbox>
      </div>
    </template>
    <template v-if="config.editorViewMode === 'tab'">
      <ul class="editor-tabs">
        <li
          class="editor-tab"
          :class="{
            'editor-tab--active': currentBox === type
          }"
          v-for="[type, content] in showBoxes"
          :key="type"
          @click="updateCurrentBox(type)"
        >
        <!-- todo: tabsName 为什么要去掉呢 -->
          <span class="editor-tabName">{{
            content.tabName || content.transformer || type.toUpperCase()
          }}</span>
          <!-- <span>
            {{ content.transformer }}
          </span> -->
        </li>
      </ul>
      <sandbox
        v-for="[type, content] in showBoxes"
        :key="type + content.key"
        v-show="currentBox === type"
        class="editor-sandbox--tab"
        :value="content.code"
        :language="content.transformer"
        :editorHook="content.editorHook"
        :inputHook="content.inputHook"
        @input="codeUpdate(type, arguments)"
      >
        &lt;
      </sandbox>
    </template>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar';
import Sandbox from './sandbox.vue';
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState([
      'foldBoxes',
      'foldBoxes',
      'config',
      'currentBox',
      'isSidebarShown'
    ]),
    ...mapState({
      showBoxes(state) {
        return Object.entries(state.boxes).filter(([type, value]) => {
          return value.visible;
        });
      }
    })
  },
  components: { Sandbox },
  methods: {
    ...mapActions(['toggleBoxFold', 'updateCode', 'updateCurrentBox']),
    isSandboxFolded(type) {
      return this.foldBoxes.indexOf(type) > -1;
    },
    codeUpdate(type, [code]) {
      this.updateCode({ type, code });
    },
    toggleFold(type) {
      this.toggleBoxFold(type);
    }
  },
  mounted() {
    new PerfectScrollbar(document.querySelector('.editor'), {
      suppressScrollX: true
    });
  }
};
</script>

<style lang="scss">
@import '@/css/index.scss';
@import '~perfect-scrollbar/css/perfect-scrollbar.css';
.editor {
  height: 100%;
  overflow-y: auto;
  &-box {
    font-family: $link-font-family;
    margin: 0 20px 20px 20px;
    &Name {
      line-height: 60px;
      border-bottom: 1px solid rgba($c-highlight, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      &Btn {
        width: 15px;
        height: 15px;
        background: $c-highlight;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        &::after {
          content: '';
          width: 100%;
          height: 100%;
          background: $c-bg;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          transform: translate(-25%, -25%);
          transition: 0.3s all ease-out;
        }
        &--partial {
          &::after {
            transform: translate(-100%, -100%);
          }
        }
      }
      &--folded {
        & h2 {
          color: $c-font;
        }
        border-bottom-color: rgba($c-font, 0.2);
        opacity: 0.4;
      }
    }
    &Transformer {
      user-select: none;
      color: rgba($c-font, 0.4);
    }
    &Type {
      font-size: 18px;
      margin: 0;
      padding: 0;
      user-select: none;
      color: $c-highlight;
    }
  }
  &-tabs {
    display: flex;
    margin: 0;
    padding: 0;
    margin: 10px;
    border-bottom: 1px solid rgba($c-highlight, 0.2);
  }
  &-tab {
    font-family: $link-font-family;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    filter: brightness(0.6);
    transition: 0.3s all ease-out;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
    border-bottom: 4px solid transparent;
    &--active {
      filter: brightness(1);
      background: rgba($c-highlight, 0.05);
      border-bottom-color: $c-highlight;
    }
    /* &Name {
      transition: 0.3s all ease-out;
      color: rgba(#f6f4f2, 0.6);
      font-size: 18px;
    } */
  }
  &-sandbox {
    &--tab {
      margin: 0 10px;
      transition: 0.3s all ease-out;
      height: calc(100% - 72px);
    }
  }
}

@media (max-width: $c-small-screen) {
  .editor {
    &--shrink {
      height: calc(100vh - 60px);
    }
  }
}
</style>
