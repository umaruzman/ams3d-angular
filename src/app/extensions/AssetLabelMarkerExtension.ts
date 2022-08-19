declare const THREE:any;
declare const $:any;

export class AssetLabelMarkerExtension extends Autodesk.Viewing.Extension {
    _assets;
    _enabled;
    _frags;
    assets;
    constructor(viewer, options) {
        super(viewer, options);
        this._enabled = true;
        this._assets = options.assets || [];
        console.log('Assets: ',this._assets);
    }

    load() {
        const updateIconsCallback = () => {
            if (this._enabled) {
                this.updateIcons();
            }
        };
        this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.ISOLATE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.HIDE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.SHOW_EVENT, updateIconsCallback);
        this.showIcons(true)
        return true;
    }

    unload() {
        // Clean our UI elements if we added any

        return true;
    }

    // onToolbarCreated() {
    //     // Create a new toolbar group if it doesn't exist
    //    console.log('Toolbar created');
    // }
    

    showIcons(show) {
        
        const $viewer = $('#' + 'modal-container' + ' div.adsk-viewing-viewer');

        // remove previous...
        $('#' + 'modal-container' + ' div.adsk-viewing-viewer label.markup').remove();
        if (!show) return;

        // do we have anything to show?
        if (this._assets === undefined || this.assets === null) return;

        // do we have access to the instance tree?
        const tree = this.viewer.model?.getInstanceTree();
        if (tree === undefined) { console.log('Loading tree...'); return; }
        
        const onClick = (e) => {
            if (this.options.onClick)
                this.options.onClick($(e.currentTarget).data('id'));
        };
        this._frags = {}
        for (var i = 0; i < this._assets.length; i++) {
            // we need to collect all the fragIds for a given dbId
            const icon = this._assets[i];
            this._frags['dbId' + icon.dbId] = []

            // create the label for the dbId
            const $label = $(`
            <label class="markup update asset-label" data-id="${icon.dbId}">
                <span class="${icon.css}"> ${icon.label || ''}</span>
            </label>
            `);
            $label.css('display', this.viewer.isNodeVisible(icon.dbId) ? 'block' : 'none');
            $label.on('click', onClick);
            $viewer.append($label);

            // now collect the fragIds
            const _this = this;
            tree.enumNodeFragments(icon.dbId, function (fragId) {
                _this._frags['dbId' + icon.dbId].push(fragId);
                _this.updateIcons(); // re-position of each fragId found
            });
        }
    }

    getModifiedWorldBoundingBox(dbId) {
        var fragList = this.viewer.model.getFragmentList();
        const nodebBox = new THREE.Box3()

        // for each fragId on the list, get the bounding box
        for (const fragId of this._frags['dbId' + dbId]) {
            const fragbBox = new THREE.Box3();
            fragList.getWorldBounds(fragId, fragbBox);
            nodebBox.union(fragbBox); // create a unifed bounding box
        }

        return nodebBox
    }

    updateIcons() {
        for (const label of $('#' + 'modal-container' + ' div.adsk-viewing-viewer .update')) {
            const $label = $(label);
            const id = $label.data('id');

            // get the center of the dbId (based on its fragIds bounding boxes)
            const pos = this.viewer.worldToClient(this.getModifiedWorldBoundingBox(id).center());

            // position the label center to it
            $label.css('left', Math.floor(pos.x - $label[0].offsetWidth / 2) + 'px');
            $label.css('top', Math.floor(pos.y - $label[0].offsetHeight / 2) + 'px');
            $label.css('display', this.viewer.isNodeVisible(id) ? 'block' : 'none');
            $label.css('position', 'absolute');
        }
    }
}
