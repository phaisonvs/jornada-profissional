import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Hero from "./Hero";

describe("Hero", () => {
  it("exposes key data-ui markers", () => {
    const { container } = render(<Hero />);

    expect(
      container.querySelector('[data-ui="hero.root"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-ui="hero.dots"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-ui="hero.scroll-next"]'),
    ).toBeInTheDocument();
  });

  it("renders the corrected hero copy", () => {
    const { container } = render(<Hero />);
    const title = container.querySelector(
      '[data-ui="hero.title"]',
    );
    const subtitle = container.querySelector(
      '[data-ui="hero.subtitle"]',
    );
    const introText = container.querySelector(
      '[data-ui="hero.card.intro.text"]',
    );
    const introLead = introText?.querySelector("strong");

    expect(title).toHaveTextContent("Formalização da atuação");
    expect(title).toHaveTextContent("Tech Lead de CRO");
    expect(subtitle).toHaveTextContent("Lidero na prática");
    expect(introText).toHaveTextContent("Interaja com os cards!");
    expect(introLead).toHaveTextContent("Interaja com os cards!");
  });

  it("does not render the card arrows", () => {
    const { container } = render(<Hero />);
    expect(
      container.querySelector(
        '[data-ui="hero.card.intro.arrow.up"]',
      ),
    ).toBeNull();
    expect(
      container.querySelector(
        '[data-ui="hero.card.intro.arrow.down"]',
      ),
    ).toBeNull();
  });
});
