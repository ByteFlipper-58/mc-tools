<template>
  <div class="p-6 max-w-lg mx-auto">
    <h1 class="text-3xl font-bold mb-4">Stronghold Finder</h1>
    <p class="text-lg mb-4">Enter the coordinates and angle of the Ender Pearl throw for two locations to find the stronghold.</p>

    <!-- Form for the first set of coordinates -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">First Location</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="form-control">
          <label for="firstCoordinatesX" class="label">
            <span class="label-text">X Coordinate</span>
          </label>
          <input 
            type="number" 
            id="firstCoordinatesX" 
            v-model.number="firstCoordinatesX" 
            placeholder="Enter X coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="firstCoordinatesZ" class="label">
            <span class="label-text">Z Coordinate</span>
          </label>
          <input 
            type="number" 
            id="firstCoordinatesZ" 
            v-model.number="firstCoordinatesZ" 
            placeholder="Enter Z coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="firstAngle" class="label">
            <span class="label-text">Angle of the Throw</span>
          </label>
          <input 
            type="number" 
            id="firstAngle" 
            v-model.number="firstAngle" 
            placeholder="Enter angle in degrees" 
            class="input input-bordered w-full" 
            step="any"
            min="-360" 
            max="360" 
          />
        </div>
      </form>
    </div>

    <!-- Form for the second set of coordinates -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Second Location</h2>
      <form @submit.prevent="findStronghold" class="space-y-4">
        <div class="form-control">
          <label for="secondCoordinatesX" class="label">
            <span class="label-text">X Coordinate</span>
          </label>
          <input 
            type="number" 
            id="secondCoordinatesX" 
            v-model.number="secondCoordinatesX" 
            placeholder="Enter X coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="secondCoordinatesZ" class="label">
            <span class="label-text">Z Coordinate</span>
          </label>
          <input 
            type="number" 
            id="secondCoordinatesZ" 
            v-model.number="secondCoordinatesZ" 
            placeholder="Enter Z coordinate" 
            class="input input-bordered w-full" 
            step="any"
            min="-1000000" 
          />
        </div>
        <div class="form-control">
          <label for="secondAngle" class="label">
            <span class="label-text">Angle of the Throw</span>
          </label>
          <input 
            type="number" 
            id="secondAngle" 
            v-model.number="secondAngle" 
            placeholder="Enter angle in degrees" 
            class="input input-bordered w-full" 
            step="any"
            min="-360" 
            max="360" 
          />
        </div>
      </form>
    </div>

    <!-- Submit Button -->
    <button 
      @click="findStronghold" 
      class="btn btn-primary w-full mt-4"
    >
      Find Stronghold
    </button>

    <!-- Go Back Button -->
    <button 
      @click="goBack" 
      class="btn btn-secondary w-full mt-4"
    >
      Go Back
    </button>

    <!-- Display Result -->
    <div v-if="strongholdLocation" class="mt-6 p-4 border rounded bg-gray-100">
      <h2 class="text-xl font-semibold mb-2">Estimated Stronghold Location</h2>
      <p>X: {{ strongholdLocation.x }}</p>
      <p>Z: {{ strongholdLocation.z }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StrongholdFinder',
  data() {
    return {
      // First set of coordinates and angle
      firstCoordinatesX: null,
      firstCoordinatesZ: null,
      firstAngle: null,

      // Second set of coordinates and angle
      secondCoordinatesX: null,
      secondCoordinatesZ: null,
      secondAngle: null,

      // Result of the stronghold calculation
      strongholdLocation: null
    };
  },
  methods: {
    findStronghold() {
      const radToDeg = Math.PI / 180;

      const p = radToDeg; // Conversion factor from degrees to radians
      const cot = (x) => 1 / Math.tan(x);

      const a1 = parseFloat(this.firstAngle);
      const a2 = parseFloat(this.secondAngle);
      const x1 = parseFloat(this.firstCoordinatesX);
      const z1 = parseFloat(this.firstCoordinatesZ);
      const x2 = parseFloat(this.secondCoordinatesX);
      const z2 = parseFloat(this.secondCoordinatesZ);

      if (Math.abs(a1 - a2) < 1) {
        alert("Angles cannot be equal!");
      } else if ((((a1 < 0) && (a2 > 0)) || ((a1 > 0) && (a2 < 0))) && (Math.abs(Math.abs(Math.abs(a1) - 180) - Math.abs(a2)) < 1)) {
        alert("Angles cannot be opposite!");
      } else {
        let xOutput, zOutput;

        switch (Math.round(a1)) {
          case -180:
          case 0:
          case 180:
            xOutput = Math.round(x1);
            zOutput = Math.round(cot(-a2 * p) * x1 - (x2 * cot(-a2 * p) - z2));
            break;
          case -90:
          case 90:
            zOutput = Math.round(z1);
            xOutput = Math.round(Math.round(x2 * cot(-a2 * p) - z2 + z1) / cot(-a2 * p));
            break;
          default:
            switch (Math.round(a2)) {
              case -180:
              case 0:
              case 180:
                xOutput = Math.round(x2);
                zOutput = Math.round(cot(-a1 * p) * x2 - (x1 * cot(-a1 * p) - z1));
                break;
              case -90:
              case 90:
                zOutput = Math.round(z2);
                xOutput = Math.round((x1 * cot(-a1 * p) - z1 + z2) / cot(-a1 * p));
                break;
              default:
                xOutput = Math.round(((x1 * cot(-a1 * p) - z1) - (x2 * cot(-a2 * p) - z2)) / (cot(-a1 * p) - cot(-a2 * p)));
                zOutput = Math.round(cot(-a1 * p) * xOutput - (x1 * cot(-a1 * p) - z1));
            }
        }

        this.strongholdLocation = {
          x: xOutput.toFixed(2),
          z: zOutput.toFixed(2)
        };

        console.log('Calculated Stronghold Location:', this.strongholdLocation);
      }
    },
    goBack() {
      this.$router.push('/'); // Navigate back to the home screen
    }
  }
};
</script>

<style scoped>
/* Add styles for the Stronghold Finder here */
</style>