const { performance } = window;
let performanceData = null;

if (process.env.NODE_ENV !== `production`) {
  performanceData = {
    disabled: false,

    start(name) {
      performance.mark(`${name} start`);
    },

    end(name) {
      performance.mark(`${name} end`);
    },

    measure(name) {
      if (!this.disabled) {
        return false;
      }
      const { duration } = performance.measure(
        `${name} measure`,
        `${name} start`,
        `${name} end`
      );

      this.statistics.summaryTime[name] = this.statistics.summaryTime[name]
        ? this.statistics.summaryTime[name] + duration
        : duration;

      return duration;
    },

    print() {
      console.info(`summary time: `, this.statistics.summaryTime); // eslint-disable-line no-console
    },

    clear() {
      this.statistics = {
        summaryTime: {}
      };
    },

    startTracking() {
      this.disabled = false;
    },

    stopTracking() {
      this.disabled = true;
    },

    statistics: {
      summaryTime: {}
    }
  };
}

const componentPerformance = performanceData;

export default componentPerformance;
