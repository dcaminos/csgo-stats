import randomColor from "randomcolor";
import { createSelector } from "reselect";

const getRandomRgb = () => {
  var num = Math.round(0xffffff * Math.random());
  var r = num >> 16;
  var g = (num >> 8) & 255;
  var b = num & 255;
  // return 'rgba(' + r + ', ' + g + ', ' + b + ')';
  return { r, g, b };
};

const generateLineStyle = (playerId) => {
  const color = randomColor({
    seed: playerId,
    luminosity: "dark",
    format: "rgba",
  });

  return {
    fill: false,
    lineTension: 0.1,
    backgroundColor: color,
    borderColor: color,
    borderCapStyle: "butt",
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: "miter",
    pointBorderColor: color,
    pointBackgroundColor: "#fff",
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: color,
    pointHoverBorderColor: color,
    pointHoverBorderWidth: 2,

    pointRadius: 1,
    pointHitRadius: 10,
  };
};

const getTimestamps = (data) =>
  Array.from(
    new Set(
      data
        .map((player) => player.data.map((x) => x.timestamp._seconds))
        .flat()
        .sort((a, b) => a - b)
    )
  );

const getChartData = ({ data, indicators }) => {
  const timestamps = getTimestamps(data);

  const { selectedId } = indicators;

  const datasets = data.map((player) => ({
    ...generateLineStyle(player.id),
    label: player.name,
    hidden: true,
    data: timestamps.map(
      (t) =>
        (player.data.find((x) => x.timestamp._seconds === t) || {
          [selectedId]: 0,
        })[selectedId]
    ),
  }));

  const result = {
    labels: timestamps.map((t) =>
      new Date(t * 1000).toLocaleDateString("es-AR")
    ),
    datasets: datasets,
  };

  return result;
};

export const getChartDataSelector = createSelector(
  (state) => state.progress,
  getChartData
);

export const isLoadingSelector = createSelector(
  (state) => state.progress.isLoading,
  (isLoading) => isLoading
);

export const selectedIndicatorSelector = createSelector(
  (state) => state.progress.indicators,
  (indicatods) => indicatods.selectedId
);
export const indicatorOptionsSelector = createSelector(
  (state) => state.progress.indicators.options,
  (options) => options
);
