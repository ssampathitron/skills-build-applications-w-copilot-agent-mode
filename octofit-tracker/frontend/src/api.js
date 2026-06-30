import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const isCodespaceConfigured = Boolean(codespaceName);

export function getCollectionUrl(resource) {
  return `${apiBaseUrl}/${resource}/`;
}

export function getCodespaceCollectionUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/${resource}/`
    : `http://localhost:8000/api/${resource}/`;
}

function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      responseShape: 'array',
      total: payload.length,
    };
  }

  const candidates = [
    ['results', payload?.results],
    ['items', payload?.items],
    ['data', payload?.data],
  ];

  const match = candidates.find(([, value]) => Array.isArray(value));

  if (match) {
    const [responseShape, items] = match;
    const total = Number(
      payload?.count ?? payload?.total ?? payload?.totalCount ?? payload?.records ?? items.length,
    );

    return {
      items,
      responseShape,
      total: Number.isFinite(total) ? total : items.length,
    };
  }

  return {
    items: [],
    responseShape: 'unknown',
    total: 0,
  };
}

export function useApiCollectionByUrl(endpoint) {
  const [state, setState] = useState({
    items: [],
    total: 0,
    responseShape: 'loading',
    isLoading: true,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadCollection() {
      try {
        const response = await fetch(endpoint, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const normalized = normalizeCollectionResponse(payload);

        setState({
          ...normalized,
          isLoading: false,
          error: '',
        });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          items: [],
          total: 0,
          responseShape: 'error',
          isLoading: false,
          error: error instanceof Error ? error.message : 'Unknown request error',
        });
      }
    }

    loadCollection();

    return () => {
      controller.abort();
    };
  }, [endpoint]);

  return {
    ...state,
    endpoint,
  };
}

export function useApiCollection(resource) {
  return useApiCollectionByUrl(getCollectionUrl(resource));
}