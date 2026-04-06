import { render, screen, fireEvent } from "@testing-library/react";
import { useEffect, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { fakeCarouselApi } = vi.hoisted(() => {
  const fakeCarouselApi = {
    selectedScrollSnap: vi.fn(() => 0),
    on: vi.fn(),
    off: vi.fn(),
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
  };

  return {
    fakeCarouselApi,
  };
});

vi.mock("@/components/cases-utils", () => ({
  shuffleArray: (items: readonly unknown[]) => [...items],
  uniqueCases: (items: readonly unknown[]) => [...items],
}));

vi.mock("@/components/ui/carousel", () => ({
  Carousel: ({
    children,
    setApi,
    ...props
  }: {
    children: ReactNode;
    setApi?: (api: typeof fakeCarouselApi) => void;
  } & React.HTMLAttributes<HTMLDivElement>) => {
    useEffect(() => {
      setApi?.(fakeCarouselApi);
    }, [setApi]);

    return <div {...props}>{children}</div>;
  },
  CarouselContent: ({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
  CarouselItem: ({ children, ...props }: { children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props}>{children}</div>
  ),
}));

vi.mock("@/hooks/use-in-view", () => ({
  useInView: () => ({ ref: vi.fn(), isVisible: true }),
}));

import Cases from "./Cases";

describe("Cases", () => {
  beforeEach(() => {
    fakeCarouselApi.selectedScrollSnap.mockClear();
    fakeCarouselApi.on.mockClear();
    fakeCarouselApi.off.mockClear();
    fakeCarouselApi.scrollPrev.mockClear();
    fakeCarouselApi.scrollNext.mockClear();
    fakeCarouselApi.scrollTo.mockClear();
  });

  it("renders the carousel without autoplay controls", () => {
    const { container } = render(<Cases />);

    expect(
      container.querySelector('[data-ui="cases.root"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-ui="cases.carousel"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-ui="cases.pagination"]'),
    ).toBeInTheDocument();
  });

  it("does not open the modal when the user drags a case card", () => {
    render(<Cases />);

    const card = screen.getByRole("button", { name: /Localpage/i });

    fireEvent.mouseDown(card, {
      button: 0,
      clientX: 10,
      clientY: 10,
    });
    fireEvent.mouseUp(card, {
      clientX: 40,
      clientY: 18,
    });
    fireEvent.click(card, {
      clientX: 40,
      clientY: 18,
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
