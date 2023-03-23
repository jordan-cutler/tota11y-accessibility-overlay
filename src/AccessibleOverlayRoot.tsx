import React, { useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { CacheProvider } from '@emotion/core';
import { cache, css } from 'emotion';

export type AccessibleOverlayRootProps = {
  rootId: string;
};

const visuallyHidden = css``;

const HeadingsPlugin = () => {
  const inputId = useId();
  const descriptionId = useId();
  return (
    <div>
      <label htmlFor={inputId} className={visuallyHidden}>
        Headings enabled
      </label>
      <input
        type="checkbox"
        id={inputId}
        aria-describedby={descriptionId}
        className={visuallyHidden}
      />
      <p id={descriptionId}>Highlights headings</p>
    </div>
  );
};

export type ToolbarBodyProps = {
  show: boolean;
};
const ToolbarBody = ({ show }: ToolbarBodyProps) => {
  return (
    <div id="toolbar-body" hidden={!show}>
      <ul>
        <li role="menuitem">
          <HeadingsPlugin />
        </li>
        <li role="menuitem">
          <HeadingsPlugin />
        </li>
        <li role="menuitem">
          <HeadingsPlugin />
        </li>
        <li role="menuitem">
          <HeadingsPlugin />
        </li>
        <li role="menuitem">
          <HeadingsPlugin />
        </li>
      </ul>
    </div>
  );
};

const ActualRoot = () => {
  const [expanded, setExpanded] = useState(false);
  const overlayId = useId();

  return (
    <div
      className={css`
        background-color: #333 !important;
        color: #f2f2f2 !important;
        position: fixed !important;
        top: auto !important;
        right: auto !important;
        bottom: 0 !important;
        left: 10px !important;
        border-top-left-radius: 5px !important;
        border-top-right-radius: 5px !important;
        overflow: hidden !important;
        z-index: 9998 !important;
      `}
      aria-expanded={expanded}
      id={overlayId}
    >
      <ToolbarBody show={expanded} />

      <button
        onClick={() => setExpanded((prev) => !prev)}
        type="button"
        aria-controls={overlayId}
      >
        {expanded ? 'Close' : 'Open'}
      </button>
    </div>
  );
};

export const AccessibleOverlayRoot = ({
  rootId,
}: AccessibleOverlayRootProps) => {
  const portalElement = document.getElementById(rootId) as Element;
  return (
    <CacheProvider value={cache}>
      {createPortal(<ActualRoot />, portalElement)}
    </CacheProvider>
  );
};
