/**
 * @format
 */

import 'react-native';
import React from 'react';
import { act, renderHook } from "@testing-library/react-hooks";
import App from '../App';
import ImageDetailView from "../src/View/GalaxyViewer/ImageDetailView";

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import fetchMock from "jest-fetch-mock";
import {api} from '../src/Services/api';
import {setupApiStore} from "../testutils";

import type {
  AnyAction,
    EnhancedStore,
    Middleware,
    Store,
} from '@reduxjs/toolkit'

import { Provider } from 'react-redux'
import Config from "../src/Config";


const updateTimeout = 5000;

const route = { params: { itemData: {

      date: "2022-08-30",
      explanation: "This new view of Jupiter is illuminating. High-resolution infrared images of Jupiter from the new James Webb Space Telescope (Webb) reveal, for example, previously unknown differences between high-floating bright clouds -- including the Great Red Spot -- and low-lying dark clouds. Also clearly visible in the featured Webb image are Jupiter's dust ring, bright auroras at the poles, and Jupiter's moons Amalthea and Adrastea. Large volcanic moon Io's magnetic funneling of charged particles onto Jupiter is also visible in the southern aurora. Some objects are so bright that light noticeably diffracts around Webb's optics creating streaks.  Webb, which orbits the Sun near the Earth, has a mirror over six meters across making it the largest astronomical telescope ever launched -- with over six times more light-collecting area than Hubble.",
      hdurl: "https://apod.nasa.gov/apod/image/2208/Jupiter2_WebbSchmidt_3283_annotated.png",
      media_type: "image",
      service_version: "v1",
      title: "Jupiter from the Webb Space Telescope",
      url: "https://apod.nasa.gov/apod/image/2208/Jupiter2_WebbSchmidt_1080_annotated.jpg"

    } }}

const date = {startDate:"2022-08-30",endDate:"2022-08-30"}

const response = [{

  date: "2022-08-30",
  explanation: "This new view of Jupiter is illuminating. High-resolution infrared images of Jupiter from the new James Webb Space Telescope (Webb) reveal, for example, previously unknown differences between high-floating bright clouds -- including the Great Red Spot -- and low-lying dark clouds. Also clearly visible in the featured Webb image are Jupiter's dust ring, bright auroras at the poles, and Jupiter's moons Amalthea and Adrastea. Large volcanic moon Io's magnetic funneling of charged particles onto Jupiter is also visible in the southern aurora. Some objects are so bright that light noticeably diffracts around Webb's optics creating streaks.  Webb, which orbits the Sun near the Earth, has a mirror over six meters across making it the largest astronomical telescope ever launched -- with over six times more light-collecting area than Hubble.",
  hdurl: "https://apod.nasa.gov/apod/image/2208/Jupiter2_WebbSchmidt_3283_annotated.png",
  media_type: "image",
  service_version: "v1",
  title: "Jupiter from the Webb Space Telescope",
  url: "https://apod.nasa.gov/apod/image/2208/Jupiter2_WebbSchmidt_1080_annotated.jpg"

}]

beforeEach((): void => {
  fetchMock.resetMocks();
});

const wrapper: React.FC = ({ children }) => {
  const storeRef = setupApiStore(api);
  return <Provider store={storeRef.store}>{children}</Provider>;
};

describe("TestApi", () => {
  it("Success", async () => {
    fetchMock.mockResponse(JSON.stringify(response));
    const { result, waitForNextUpdate } = renderHook(
      () => api.endpoints.getImagesWithinRange.initiate(date),
      { wrapper }
    );

    const nextResponse = result.current;
    expect(nextResponse.data).not.toBeUndefined();
    expect(nextResponse.isSuccess).toBe(true);
    expect(nextResponse.data).toStrictEqual(response);
  });

  test("request is correct", () => {
    const storeRef = setupApiStore(api, );
    fetchMock.mockResponse(JSON.stringify(response));
    return storeRef.store
      .dispatch<any>(
        api.endpoints.getImagesWithinRange.initiate(date)
      )
      .then(() => {
        expect(fetchMock).toBeCalledTimes(1);
        const { method, headers, url } = fetchMock.mock.calls[0][0] as Request;

        const accept = headers.get(Headers.Accept);
        const authorization = headers.get(Headers.Authorization);

        expect(method).toBe("GET");
        expect(url).toBe(`${Config.API_URL}/Variants`);
        expect(accept).toBe("application/json");
        expect(authorization).toBeNull();
      });
  });

  test("Failure response", () => {
    const storeRef = setupApiStore(api);
    fetchMock.mockResponse(JSON.stringify(response));

    return storeRef.store
      .dispatch<any>(
        api.endpoints.getImagesWithinRange.initiate(date)
      )
      .then((action: any) => {
        const { status, data, isSuccess } = action;
        expect(status).toBe("rejected");
        expect(isSuccess).toBe(false);
        expect(data).toStrictEqual(undefined);
      });

  });
})
