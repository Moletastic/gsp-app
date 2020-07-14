import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import ProjectsView from '@/views/Projects/index.vue';

describe("ProjectsView.vue", () => {
    it("check if projects has been loaded", () => {
        const wrapper = shallowMount(ProjectsView);
        expect(wrapper.contains("v-card")).toBe(true);
    });
});
