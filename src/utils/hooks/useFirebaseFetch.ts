import { useReducer, useEffect } from "react";

enum FETCH {
  LOADING = "LOADING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}
type TActionLoading = { type: FETCH.LOADING };
type TActionError = { type: FETCH.ERROR; payload: string };
type TActionSuccess<T> = { type: FETCH.SUCCESS; payload: T[] };

type Action<T> = TActionLoading | TActionError | TActionSuccess<T>;

type TFetchState<T> = {
  data: T[];
  isLoading: boolean;
  error: string;
};

const initialState = {
  data: [],
  isLoading: false,
  error: "",
};

const actionFetchingLoading = (): TActionLoading => ({ type: FETCH.LOADING });
const actionFetchingError = (value: string): TActionError => ({
  type: FETCH.ERROR,
  payload: value,
});
const actionFetchingSuccess = <T>(data: T[]): TActionSuccess<T> => ({
  type: FETCH.SUCCESS,
  payload: data,
});

function reducer<T>(state: TFetchState<T>, action: Action<T>): TFetchState<T> {
  switch (action.type) {
    case FETCH.SUCCESS:
      return { ...state, data: action.payload, isLoading: false, error: "" };
    case FETCH.LOADING:
      return { ...state, data: [], isLoading: true, error: "" };
    case FETCH.ERROR:
      return { ...state, data: [], isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export const useFirebaseFetch = (firebaseFetchFn: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetch = async (...args: Parameters<typeof firebaseFetchFn>) => {
    try {
      dispatch(actionFetchingLoading());
      const response = await firebaseFetchFn(...args);

      dispatch(actionFetchingSuccess(response));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(actionFetchingError(error.message));
      } else {
        dispatch(actionFetchingError("An unknown error occurred"));
      }
    }
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...state, fetch };
};
