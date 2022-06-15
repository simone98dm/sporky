import { mount } from "@cypress/vue";
import Song from "~/components/Song.vue";

describe("Song", () => {
  it("renders without crashing", () => {
    const song = {
      name: "foo",
      artists: [{ name: "Hello,World!" }],
      url: "bar",
      cover: "null",
    };

    mount(Song, {
      propsData: { ...song },
    });

    cy.get(".song-name").should("equal", song.name);
    cy.get(".song-url").should("have.attr", "href", song.url);
  });
});
