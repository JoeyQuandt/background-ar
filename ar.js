/*===Aframe Basketball tutorialk====*/

AFRAME.registerComponent("hide-in-ar-mode", {
	// Set this object invisible while in AR mode.
	// TODO: could this be replaced with bind="visible: !ar-mode"
	// with https://www.npmjs.com/package/aframe-state-component ?
	init: function () {
		this.el.sceneEl.addEventListener("enter-vr", () => {
			if (this.el.sceneEl.is("ar-mode")) {
				this.el.setAttribute("visible", false);
			}
		});
		this.el.sceneEl.addEventListener("exit-vr", () => {
			this.el.setAttribute("visible", true);
		});
	},
});

AFRAME.registerComponent("occlusion-material", {
	update: function () {
		this.el.components.material.material.colorWrite = false;
	},
}); 