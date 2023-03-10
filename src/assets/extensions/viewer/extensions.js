/**
 * @author arodic / https://github.com/arodic
 *
 * @author chiena -- Modified for Autodesk LMV web viewer
 */
 /*jshint sub:true*/

// export function init_TransformGizmos() {

//     'use strict';

    var GizmoMaterial = function ( parameters ) {

        THREE.MeshBasicMaterial.call( this );

        this.depthTest = false;
        this.depthWrite = false;
        this.side = THREE.FrontSide;
        this.transparent = true;

        this.setValues( parameters );

        this.oldColor = this.color.clone();
        this.oldOpacity = this.opacity;

        this.highlight = function( highlighted ) {

            if ( highlighted ) {

                this.color.setRGB( 1, 230/255, 3/255 );
                this.opacity = 1;

            } else {

                this.color.copy( this.oldColor );
                this.opacity = this.oldOpacity;

            }

        };

    };

    GizmoMaterial.prototype = Object.create( THREE.MeshBasicMaterial.prototype );

    var GizmoLineMaterial = function ( parameters ) {

        THREE.LineBasicMaterial.call( this );

        this.depthTest = false;
        this.depthWrite = false;
        this.transparent = true;
        this.linewidth = 1;

        this.setValues( parameters );

        this.oldColor = this.color.clone();
        this.oldOpacity = this.opacity;

        this.highlight = function( highlighted ) {

            if ( highlighted ) {

                this.color.setRGB( 1, 230/255, 3/255 );
                this.opacity = 1;

            } else {

                this.color.copy( this.oldColor );
                this.opacity = this.oldOpacity;

            }

        };

    };

    GizmoLineMaterial.prototype = Object.create( THREE.LineBasicMaterial.prototype );

    // polyfill
    if (THREE.BufferAttribute === undefined) {
        THREE.BufferAttribute = function( array, itemSize, normalized ) {

            if ( Array.isArray( array ) ) {
    
                throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );
    
            }
    
            this.uuid = _Math.generateUUID();
            this.name = '';
    
            this.array = array;
            this.itemSize = itemSize;
            this.count = array !== undefined ? array.length / itemSize : 0;
            this.normalized = normalized === true;
    
            this.dynamic = false;
            this.updateRange = { offset: 0, count: - 1 };
    
            this.onUploadCallback = function () {};
    
            this.version = 0;
    
        }
    
        THREE.BufferAttribute.prototype = Object.defineProperty( THREE.BufferAttribute.prototype, 'needsUpdate', {
    
            set: function ( value ) {
    
                if ( value === true ) this.version ++;
    
            }
    
        } );
    
        Object.assign( THREE.BufferAttribute.prototype, {
    
            isBufferAttribute: true,
    
            setArray: function ( array ) {
    
                if ( Array.isArray( array ) ) {
    
                    throw new TypeError( 'THREE.BufferAttribute: array should be a Typed Array.' );
    
                }
    
                this.count = array !== undefined ? array.length / this.itemSize : 0;
                this.array = array;
    
            },
    
            setDynamic: function ( value ) {
    
                this.dynamic = value;
    
                return this;
    
            },
    
            copy: function ( source ) {
    
                this.array = new source.array.constructor( source.array );
                this.itemSize = source.itemSize;
                this.count = source.count;
                this.normalized = source.normalized;
    
                this.dynamic = source.dynamic;
    
                return this;
    
            },
    
            copyAt: function ( index1, attribute, index2 ) {
    
                index1 *= this.itemSize;
                index2 *= attribute.itemSize;
    
                for ( var i = 0, l = this.itemSize; i < l; i ++ ) {
    
                    this.array[ index1 + i ] = attribute.array[ index2 + i ];
    
                }
    
                return this;
    
            },
    
            copyArray: function ( array ) {
    
                this.array.set( array );
    
                return this;
    
            },
    
            copyColorsArray: function ( colors ) {
    
                var array = this.array, offset = 0;
    
                for ( var i = 0, l = colors.length; i < l; i ++ ) {
    
                    var color = colors[ i ];
    
                    if ( color === undefined ) {
    
                        console.warn( 'THREE.BufferAttribute.copyColorsArray(): color is undefined', i );
                        color = new THREE.Color();
    
                    }
    
                    array[ offset ++ ] = color.r;
                    array[ offset ++ ] = color.g;
                    array[ offset ++ ] = color.b;
    
                }
    
                return this;
    
            },
    
            copyIndicesArray: function ( indices ) {
    
                var array = this.array, offset = 0;
    
                for ( var i = 0, l = indices.length; i < l; i ++ ) {
    
                    var index = indices[ i ];
    
                    array[ offset ++ ] = index.a;
                    array[ offset ++ ] = index.b;
                    array[ offset ++ ] = index.c;
    
                }
    
                return this;
    
            },
    
            copyVector2sArray: function ( vectors ) {
    
                var array = this.array, offset = 0;
    
                for ( var i = 0, l = vectors.length; i < l; i ++ ) {
    
                    var vector = vectors[ i ];
    
                    if ( vector === undefined ) {
    
                        console.warn( 'THREE.BufferAttribute.copyVector2sArray(): vector is undefined', i );
                        vector = new THREE.Vector2();
    
                    }
    
                    array[ offset ++ ] = vector.x;
                    array[ offset ++ ] = vector.y;
    
                }
    
                return this;
    
            },
    
            copyVector3sArray: function ( vectors ) {
    
                var array = this.array, offset = 0;
    
                for ( var i = 0, l = vectors.length; i < l; i ++ ) {
    
                    var vector = vectors[ i ];
    
                    if ( vector === undefined ) {
    
                        console.warn( 'THREE.BufferAttribute.copyVector3sArray(): vector is undefined', i );
                        vector = new THREE.Vector3();
    
                    }
    
                    array[ offset ++ ] = vector.x;
                    array[ offset ++ ] = vector.y;
                    array[ offset ++ ] = vector.z;
    
                }
    
                return this;
    
            },
    
            copyVector4sArray: function ( vectors ) {
    
                var array = this.array, offset = 0;
    
                for ( var i = 0, l = vectors.length; i < l; i ++ ) {
    
                    var vector = vectors[ i ];
    
                    if ( vector === undefined ) {
    
                        console.warn( 'THREE.BufferAttribute.copyVector4sArray(): vector is undefined', i );
                        vector = new THREE.Vector4();
    
                    }
    
                    array[ offset ++ ] = vector.x;
                    array[ offset ++ ] = vector.y;
                    array[ offset ++ ] = vector.z;
                    array[ offset ++ ] = vector.w;
    
                }
    
                return this;
    
            },
    
            set: function ( value, offset ) {
    
                if ( offset === undefined ) offset = 0;
    
                this.array.set( value, offset );
    
                return this;
    
            },
    
            getX: function ( index ) {
    
                return this.array[ index * this.itemSize ];
    
            },
    
            setX: function ( index, x ) {
    
                this.array[ index * this.itemSize ] = x;
    
                return this;
    
            },
    
            getY: function ( index ) {
    
                return this.array[ index * this.itemSize + 1 ];
    
            },
    
            setY: function ( index, y ) {
    
                this.array[ index * this.itemSize + 1 ] = y;
    
                return this;
    
            },
    
            getZ: function ( index ) {
    
                return this.array[ index * this.itemSize + 2 ];
    
            },
    
            setZ: function ( index, z ) {
    
                this.array[ index * this.itemSize + 2 ] = z;
    
                return this;
    
            },
    
            getW: function ( index ) {
    
                return this.array[ index * this.itemSize + 3 ];
    
            },
    
            setW: function ( index, w ) {
    
                this.array[ index * this.itemSize + 3 ] = w;
    
                return this;
    
            },
    
            setXY: function ( index, x, y ) {
    
                index *= this.itemSize;
    
                this.array[ index + 0 ] = x;
                this.array[ index + 1 ] = y;
    
                return this;
    
            },
    
            setXYZ: function ( index, x, y, z ) {
    
                index *= this.itemSize;
    
                this.array[ index + 0 ] = x;
                this.array[ index + 1 ] = y;
                this.array[ index + 2 ] = z;
    
                return this;
    
            },
    
            setXYZW: function ( index, x, y, z, w ) {
    
                index *= this.itemSize;
    
                this.array[ index + 0 ] = x;
                this.array[ index + 1 ] = y;
                this.array[ index + 2 ] = z;
                this.array[ index + 3 ] = w;
    
                return this;
    
            },
    
            onUpload: function ( callback ) {
    
                this.onUploadCallback = callback;
    
                return this;
    
            },
    
            clone: function () {
    
                return new this.constructor( this.array, this.itemSize ).copy( this );
    
            }
    
        } );
    }

    if (THREE.Float32BufferAttribute === undefined) {
        THREE.Float32BufferAttribute = function( array, itemSize, normalized ) {

            THREE.BufferAttribute.call( this, new Float32Array( array ), itemSize, normalized );
    
        }
    
        THREE.Float32BufferAttribute.prototype = Object.create( THREE.BufferAttribute.prototype );
    }

    // polyfill
    if (THREE.PolyhedronBufferGeometry === undefined) {
        THREE.PolyhedronBufferGeometry = function ( vertices, indices, radius, detail ) {

            THREE.BufferGeometry.call( this );
    
            this.type = 'PolyhedronBufferGeometry';
    
            this.parameters = {
                vertices: vertices,
                indices: indices,
                radius: radius,
                detail: detail
            };
    
            radius = radius || 1;
            detail = detail || 0;
    
            // default buffer data
    
            var vertexBuffer = [];
            var uvBuffer = [];
    
            // the subdivision creates the vertex buffer data
    
            subdivide( detail );
    
            // all vertices should lie on a conceptual sphere with a given radius
    
            appplyRadius( radius );
    
            // finally, create the uv data
    
            generateUVs();
    
            // build non-indexed geometry
    
            this.addAttribute( 'position', new THREE.Float32BufferAttribute( vertexBuffer, 3 ) );
            this.addAttribute( 'normal', new THREE.Float32BufferAttribute( vertexBuffer.slice(), 3 ) );
            this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvBuffer, 2 ) );
    
            if ( detail === 0 ) {
    
                this.computeVertexNormals(); // flat normals
    
            } else {
    
                this.normalizeNormals(); // smooth normals
    
            }
    
            // helper functions
    
            function subdivide( detail ) {
    
                var a = new THREE.Vector3();
                var b = new THREE.Vector3();
                var c = new THREE.Vector3();
    
                // iterate over all faces and apply a subdivison with the given detail value
    
                for ( var i = 0; i < indices.length; i += 3 ) {
    
                    // get the vertices of the face
    
                    getVertexByIndex( indices[ i + 0 ], a );
                    getVertexByIndex( indices[ i + 1 ], b );
                    getVertexByIndex( indices[ i + 2 ], c );
    
                    // perform subdivision
    
                    subdivideFace( a, b, c, detail );
    
                }
    
            }
    
            function subdivideFace( a, b, c, detail ) {
    
                var cols = Math.pow( 2, detail );
    
                // we use this multidimensional array as a data structure for creating the subdivision
    
                var v = [];
    
                var i, j;
    
                // construct all of the vertices for this subdivision
    
                for ( i = 0; i <= cols; i ++ ) {
    
                    v[ i ] = [];
    
                    var aj = a.clone().lerp( c, i / cols );
                    var bj = b.clone().lerp( c, i / cols );
    
                    var rows = cols - i;
    
                    for ( j = 0; j <= rows; j ++ ) {
    
                        if ( j === 0 && i === cols ) {
    
                            v[ i ][ j ] = aj;
    
                        } else {
    
                            v[ i ][ j ] = aj.clone().lerp( bj, j / rows );
    
                        }
    
                    }
    
                }
    
                // construct all of the faces
    
                for ( i = 0; i < cols; i ++ ) {
    
                    for ( j = 0; j < 2 * ( cols - i ) - 1; j ++ ) {
    
                        var k = Math.floor( j / 2 );
    
                        if ( j % 2 === 0 ) {
    
                            pushVertex( v[ i ][ k + 1 ] );
                            pushVertex( v[ i + 1 ][ k ] );
                            pushVertex( v[ i ][ k ] );
    
                        } else {
    
                            pushVertex( v[ i ][ k + 1 ] );
                            pushVertex( v[ i + 1 ][ k + 1 ] );
                            pushVertex( v[ i + 1 ][ k ] );
    
                        }
    
                    }
    
                }
    
            }
    
            function appplyRadius( radius ) {
    
                var vertex = new THREE.Vector3();
    
                // iterate over the entire buffer and apply the radius to each vertex
    
                for ( var i = 0; i < vertexBuffer.length; i += 3 ) {
    
                    vertex.x = vertexBuffer[ i + 0 ];
                    vertex.y = vertexBuffer[ i + 1 ];
                    vertex.z = vertexBuffer[ i + 2 ];
    
                    vertex.normalize().multiplyScalar( radius );
    
                    vertexBuffer[ i + 0 ] = vertex.x;
                    vertexBuffer[ i + 1 ] = vertex.y;
                    vertexBuffer[ i + 2 ] = vertex.z;
    
                }
    
            }
    
            function generateUVs() {
    
                var vertex = new THREE.Vector3();
    
                for ( var i = 0; i < vertexBuffer.length; i += 3 ) {
    
                    vertex.x = vertexBuffer[ i + 0 ];
                    vertex.y = vertexBuffer[ i + 1 ];
                    vertex.z = vertexBuffer[ i + 2 ];
    
                    var u = azimuth( vertex ) / 2 / Math.PI + 0.5;
                    var v = inclination( vertex ) / Math.PI + 0.5;
                    uvBuffer.push( u, 1 - v );
    
                }
    
                correctUVs();
    
                correctSeam();
    
            }
    
            function correctSeam() {
    
                // handle case when face straddles the seam, see #3269
    
                for ( var i = 0; i < uvBuffer.length; i += 6 ) {
    
                    // uv data of a single face
    
                    var x0 = uvBuffer[ i + 0 ];
                    var x1 = uvBuffer[ i + 2 ];
                    var x2 = uvBuffer[ i + 4 ];
    
                    var max = Math.max( x0, x1, x2 );
                    var min = Math.min( x0, x1, x2 );
    
                    // 0.9 is somewhat arbitrary
    
                    if ( max > 0.9 && min < 0.1 ) {
    
                        if ( x0 < 0.2 ) uvBuffer[ i + 0 ] += 1;
                        if ( x1 < 0.2 ) uvBuffer[ i + 2 ] += 1;
                        if ( x2 < 0.2 ) uvBuffer[ i + 4 ] += 1;
    
                    }
    
                }
    
            }
    
            function pushVertex( vertex ) {
    
                vertexBuffer.push( vertex.x, vertex.y, vertex.z );
    
            }
    
            function getVertexByIndex( index, vertex ) {
    
                var stride = index * 3;
    
                vertex.x = vertices[ stride + 0 ];
                vertex.y = vertices[ stride + 1 ];
                vertex.z = vertices[ stride + 2 ];
    
            }
    
            function correctUVs() {
    
                var a = new THREE.Vector3();
                var b = new THREE.Vector3();
                var c = new THREE.Vector3();
    
                var centroid = new THREE.Vector3();
    
                var uvA = new THREE.Vector2();
                var uvB = new THREE.Vector2();
                var uvC = new THREE.Vector2();
    
                for ( var i = 0, j = 0; i < vertexBuffer.length; i += 9, j += 6 ) {
    
                    a.set( vertexBuffer[ i + 0 ], vertexBuffer[ i + 1 ], vertexBuffer[ i + 2 ] );
                    b.set( vertexBuffer[ i + 3 ], vertexBuffer[ i + 4 ], vertexBuffer[ i + 5 ] );
                    c.set( vertexBuffer[ i + 6 ], vertexBuffer[ i + 7 ], vertexBuffer[ i + 8 ] );
    
                    uvA.set( uvBuffer[ j + 0 ], uvBuffer[ j + 1 ] );
                    uvB.set( uvBuffer[ j + 2 ], uvBuffer[ j + 3 ] );
                    uvC.set( uvBuffer[ j + 4 ], uvBuffer[ j + 5 ] );
    
                    centroid.copy( a ).add( b ).add( c ).divideScalar( 3 );
    
                    var azi = azimuth( centroid );
    
                    correctUV( uvA, j + 0, a, azi );
                    correctUV( uvB, j + 2, b, azi );
                    correctUV( uvC, j + 4, c, azi );
    
                }
    
            }
    
            function correctUV( uv, stride, vector, azimuth ) {
    
                if ( ( azimuth < 0 ) && ( uv.x === 1 ) ) {
    
                    uvBuffer[ stride ] = uv.x - 1;
    
                }
    
                if ( ( vector.x === 0 ) && ( vector.z === 0 ) ) {
    
                    uvBuffer[ stride ] = azimuth / 2 / Math.PI + 0.5;
    
                }
    
            }
    
            // Angle around the Y axis, counter-clockwise when looking from above.
    
            function azimuth( vector ) {
    
                return Math.atan2( vector.z, - vector.x );
    
            }
    
    
            // Angle above the XZ plane.
    
            function inclination( vector ) {
    
                return Math.atan2( - vector.y, Math.sqrt( ( vector.x * vector.x ) + ( vector.z * vector.z ) ) );
    
            }
    
        }

        THREE.PolyhedronBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
    }

    // polyfill
    if (THREE.OctahedronBufferGeometry === undefined) {
        THREE.OctahedronBufferGeometry = function ( radius, detail ) {

            this.parameters = {
                radius: radius,
                detail: detail
            };

            var vertices = [
                1, 0, 0,   - 1, 0, 0,    0, 1, 0,    0,- 1, 0,    0, 0, 1,    0, 0,- 1
            ];

            var indices = [
                0, 2, 4,    0, 4, 3,    0, 3, 5,    0, 5, 2,    1, 2, 5,    1, 5, 3,    1, 3, 4,    1, 4, 2
            ];

            THREE.PolyhedronBufferGeometry.call( this, vertices, indices, radius, detail );

            this.type = 'OctahedronBufferGeometry';

            this.parameters = {
                radius: radius,
                detail: detail
            };
        };

        THREE.OctahedronBufferGeometry.prototype = Object.create( THREE.PolyhedronBufferGeometry.prototype );
    }

    // polyfill
    if (THREE.TorusBufferGeometry === undefined) {
        THREE.TorusBufferGeometry = function ( radius, tube, radialSegments, tubularSegments, arc ) {

        THREE.BufferGeometry.call( this );

		this.type = 'TorusBufferGeometry';

		this.parameters = {
			radius: radius,
			tube: tube,
			radialSegments: radialSegments,
			tubularSegments: tubularSegments,
			arc: arc
		};

		radius = radius || 1;
		tube = tube || 0.4;
		radialSegments = Math.floor( radialSegments ) || 8;
		tubularSegments = Math.floor( tubularSegments ) || 6;
		arc = arc || Math.PI * 2;

		// buffers

		var indices = [];
		var vertices = [];
		var normals = [];
		var uvs = [];

		// helper variables

		var center = new THREE.Vector3();
		var vertex = new THREE.Vector3();
		var normal = new THREE.Vector3();

		var j, i;

		// generate vertices, normals and uvs

		for ( j = 0; j <= radialSegments; j ++ ) {

			for ( i = 0; i <= tubularSegments; i ++ ) {

				var u = i / tubularSegments * arc;
				var v = j / radialSegments * Math.PI * 2;

				// vertex

				vertex.x = ( radius + tube * Math.cos( v ) ) * Math.cos( u );
				vertex.y = ( radius + tube * Math.cos( v ) ) * Math.sin( u );
				vertex.z = tube * Math.sin( v );

				vertices.push( vertex.x, vertex.y, vertex.z );

				// normal

				center.x = radius * Math.cos( u );
				center.y = radius * Math.sin( u );
				normal.subVectors( vertex, center ).normalize();

				normals.push( normal.x, normal.y, normal.z );

				// uv

				uvs.push( i / tubularSegments );
				uvs.push( j / radialSegments );

			}

		}

		// generate indices

		for ( j = 1; j <= radialSegments; j ++ ) {

			for ( i = 1; i <= tubularSegments; i ++ ) {

				// indices

				var a = ( tubularSegments + 1 ) * j + i - 1;
				var b = ( tubularSegments + 1 ) * ( j - 1 ) + i - 1;
				var c = ( tubularSegments + 1 ) * ( j - 1 ) + i;
				var d = ( tubularSegments + 1 ) * j + i;

				// faces

				indices.push( a, b, d );
				indices.push( b, c, d );

			}

		}

		// build geometry

		this.setIndex( indices );
		this.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		this.addAttribute( 'normal', new THREE.Float32BufferAttribute( normals, 3 ) );
		this.addAttribute( 'uv', new THREE.Float32BufferAttribute( uvs, 2 ) );
        };

        THREE.TorusBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
    }

    var createCircleGeometry = function ( radius, facing, arc ) {

        var geometry = new THREE.Geometry();
        arc = arc ? arc : 1;
        for ( var i = 0; i <= 64 * arc; ++i ) {
            if ( facing == 'x' ) geometry.vertices.push( new THREE.Vector3( 0, Math.cos( i / 32 * Math.PI ), Math.sin( i / 32 * Math.PI ) ).multiplyScalar(radius) );
            if ( facing == 'y' ) geometry.vertices.push( new THREE.Vector3( Math.cos( i / 32 * Math.PI ), 0, Math.sin( i / 32 * Math.PI ) ).multiplyScalar(radius) );
            if ( facing == 'z' ) geometry.vertices.push( new THREE.Vector3( Math.sin( i / 32 * Math.PI ), Math.cos( i / 32 * Math.PI ), 0 ).multiplyScalar(radius) );
        }

        return geometry;
    };

    var createArrowGeometry = function ( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded ) {

        var arrowGeometry = new THREE.Geometry();
        var mesh = new THREE.Mesh( new THREE.CylinderGeometry( radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded ) );
        mesh.position.y = 0.5;
        mesh.updateMatrix();

        arrowGeometry.merge( mesh.geometry, mesh.matrix );

        return arrowGeometry;
    };

    var createLineGeometry = function ( axis ) {

        var lineGeometry = new THREE.Geometry();
        if ( axis === 'X') 
            lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 1, 0, 0 ) );
        else if ( axis === 'Y' ) 
            lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 1, 0 ) );
        else if ( axis === 'Z' )
            lineGeometry.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 1 ) );

        return lineGeometry;
    };

    THREE.TransformGizmo = function () {

        var scope = this;
        var showPickers = false; //debug
        var showActivePlane = false; //debug

        this.init = function () {

            THREE.Object3D.call( this );

            this.handles = new THREE.Object3D();
            this.pickers = new THREE.Object3D();
            this.planes = new THREE.Object3D();
            this.highlights = new THREE.Object3D();
            this.hemiPicker = new THREE.Object3D();
            this.subPickers = new THREE.Object3D();

            this.add(this.handles);
            this.add(this.pickers);
            this.add(this.planes);
            this.add(this.highlights);
            this.add(this.hemiPicker);
            this.add(this.subPickers);

            //// PLANES

            var planeGeometry = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 );
            var planeMaterial = new THREE.MeshBasicMaterial( { wireframe: true } );
            planeMaterial.side = THREE.DoubleSide;

            var planes = {
                "XY":   new THREE.Mesh( planeGeometry, planeMaterial ),
                "YZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
                "XZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
                "XYZE": new THREE.Mesh( planeGeometry, planeMaterial )
            };

            this.activePlane = planes["XYZE"];

            planes["YZ"].rotation.set( 0, Math.PI/2, 0 );
            planes["XZ"].rotation.set( -Math.PI/2, 0, 0 );

            for (var i in planes) {
                planes[i].name = i;
                this.planes.add(planes[i]);
                this.planes[i] = planes[i];
                planes[i].visible = false;
            }

            this.setupGizmos();
            this.activeMode = "";

            // reset Transformations

            this.traverse(function ( child ) {
                if (child instanceof THREE.Mesh) {
                    child.updateMatrix();

                    var tempGeometry = new THREE.Geometry();
                    if (child.geometry instanceof THREE.BufferGeometry) {
                        child.geometry = new THREE.Geometry().fromBufferGeometry( child.geometry );
                    }
                    tempGeometry.merge( child.geometry, child.matrix );

                    child.geometry = tempGeometry;
                    child.position.set( 0, 0, 0 );
                    child.rotation.set( 0, 0, 0 );
                    child.scale.set( 1, 1, 1 );
                }
            });

        };

        this.hide = function () {
            this.traverse(function( child ) {
                child.visible = false;
            });
        };

        this.show = function () {
            this.traverse(function( child ) {
                child.visible = true;
                if (child.parent == scope.pickers || child.parent == scope.hemiPicker ) child.visible = showPickers;
                if (child.parent == scope.planes ) child.visible = false;
            });
            this.activePlane.visible = showActivePlane;
        };

        this.highlight = function ( axis ) {
            this.traverse(function( child ) {
                if ( child.material && child.material.highlight ) {
                    if ( child.name == axis ) {
                        child.material.highlight( true );
                    } else {
                        child.material.highlight( false );
                    }
                }
            });
        };

        this.setupGizmos = function () {

            var addGizmos = function( gizmoMap, parent ) {

                for ( var name in gizmoMap ) {

                    for ( var i = gizmoMap[name].length; i--;) {

                        var object = gizmoMap[name][i][0];
                        var position = gizmoMap[name][i][1];
                        var rotation = gizmoMap[name][i][2];
                        var visble = gizmoMap[name][i][3];

                        object.name = name;

                        if ( position ) object.position.set( position[0], position[1], position[2] );
                        if ( rotation ) object.rotation.set( rotation[0], rotation[1], rotation[2] );
                        if ( visble ) object.visble = visble;

                        parent.add( object );

                    }

                }

            };

            this.setHandlePickerGizmos();

            addGizmos(this.handleGizmos, this.handles);
            addGizmos(this.pickerGizmos, this.pickers);
            addGizmos(this.highlightGizmos, this.highlights);
            addGizmos(this.hemiPickerGizmos, this.hemiPicker);
            addGizmos(this.subPickerGizmos, this.subPickers);

            this.hide();
            this.show();

        };

    };

    THREE.TransformGizmo.prototype = Object.create( THREE.Object3D.prototype );

    THREE.TransformGizmo.prototype.update = function ( rotation, eye ) {

        var vec1 = new THREE.Vector3( 0, 0, 0 );
        var vec2 = new THREE.Vector3( 0, 1, 0 );
        var lookAtMatrix = new THREE.Matrix4();

        this.traverse(function(child) {
            if ( child.name ) {
                if ( child.name.search("E") != -1 ) {
                    child.quaternion.setFromRotationMatrix( lookAtMatrix.lookAt( eye, vec1, vec2 ) );
                } else if ( child.name.search("X") != -1 || child.name.search("Y") != -1 || child.name.search("Z") != -1 ) {
                    child.quaternion.setFromEuler( rotation );
                }
            }
        });

    };

    THREE.TransformGizmoTranslate = function () {

        THREE.TransformGizmo.call( this );

        this.setHandlePickerGizmos = function () {

            var arrowGeometry = createArrowGeometry( 0, 0.05, 0.2, 12, 1, false );
            var lineXGeometry = createLineGeometry( 'X' );
            var lineYGeometry = createLineGeometry( 'Y' );
            var lineZGeometry = createLineGeometry( 'Z' );

            this.handleGizmos = {
                X: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xf12c2c } ) ), [ 0.5, 0, 0 ], [ 0, 0, -Math.PI/2 ] ],
                    [ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xf12c2c } ) ) ]
                ],
                Y: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0bb80b } ) ), [ 0, 0.5, 0 ] ],
                    [   new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x0bb80b } ) ) ]
                ],
                Z: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x2c2cf1 } ) ), [ 0, 0, 0.5 ], [ Math.PI/2, 0, 0 ] ],
                    [ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x2c2cf1 } ) ) ]
                ],
                XYZ: [
                    [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.1, 0 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ 0, 0, 0 ] ]
                ],
                XY: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0xffff00, opacity: 0.25 } ) ), [ 0.15, 0.15, 0 ] ]
                ],
                YZ: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0x00ffff, opacity: 0.25 } ) ), [ 0, 0.15, 0.15 ], [ 0, Math.PI/2, 0 ] ]
                ],
                XZ: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.29, 0.29 ), new GizmoMaterial( { color: 0xff00ff, opacity: 0.25 } ) ), [ 0.15, 0, 0.15 ], [ -Math.PI/2, 0, 0 ] ]
                ]
            };

            this.pickerGizmos = {
                X: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0xff0000, opacity: 0.25 } ) ), [ 0.6, 0, 0 ], [ 0, 0, -Math.PI/2 ] ]
                ],
                Y: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0x00ff00, opacity: 0.25 } ) ), [ 0, 0.6, 0 ] ]
                ],
                Z: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0.6 ], [ Math.PI/2, 0, 0 ] ]
                ],
                XYZ: [
                    [ new THREE.Mesh( new THREE.OctahedronBufferGeometry( 0.2, 0 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
                ],
                XY: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), new GizmoMaterial( { color: 0xffff00, opacity: 0.25 } ) ), [ 0.2, 0.2, 0 ] ]
                ],
                YZ: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), new GizmoMaterial( { color: 0x00ffff, opacity: 0.25 } ) ), [ 0, 0.2, 0.2 ], [ 0, Math.PI/2, 0 ] ]
                ],
                XZ: [
                    [ new THREE.Mesh( new THREE.PlaneBufferGeometry( 0.4, 0.4 ), new GizmoMaterial( { color: 0xff00ff, opacity: 0.25 } ) ), [ 0.2, 0, 0.2 ], [ -Math.PI/2, 0, 0 ] ]
                ]
            };

            this.hemiPickerGizmos = {
                XYZ: [
                    [ new THREE.Mesh( new THREE.BoxGeometry( 1.2, 1.2, 1.2 ), new GizmoMaterial( { color: 0x0000ff } ) ), [ 0.5, 0.5, 0.5 ], null, false ]
                ]
            };

        };

        this.setActivePlane = function ( axis, eye ) {

            var tempMatrix = new THREE.Matrix4();
            eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

            if ( axis == "X" ) {
                this.activePlane = this.planes[ "XY" ];
                if ( Math.abs(eye.y) > Math.abs(eye.z) ) this.activePlane = this.planes[ "XZ" ];
            }

            if ( axis == "Y" ){
                this.activePlane = this.planes[ "XY" ];
                if ( Math.abs(eye.x) > Math.abs(eye.z) ) this.activePlane = this.planes[ "YZ" ];
            }

            if ( axis == "Z" ){
                this.activePlane = this.planes[ "XZ" ];
                if ( Math.abs(eye.x) > Math.abs(eye.y) ) this.activePlane = this.planes[ "YZ" ];
            }

            if ( axis == "XYZ" ) this.activePlane = this.planes[ "XYZE" ];

            if ( axis == "XY" ) this.activePlane = this.planes[ "XY" ];

            if ( axis == "YZ" ) this.activePlane = this.planes[ "YZ" ];

            if ( axis == "XZ" ) this.activePlane = this.planes[ "XZ" ];

            this.hide();
            this.show();

        };

        this.init();

    };

    THREE.TransformGizmoTranslate.prototype = Object.create( THREE.TransformGizmo.prototype );

    THREE.TransformGizmoRotate = function () {

        THREE.TransformGizmo.call( this );

        this.setHandlePickerGizmos = function () {

            this.handleGizmos = {
                RX: [
                    [ new THREE.Line( createCircleGeometry(1,'x',0.5), new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
                ],
                RY: [
                    [ new THREE.Line( createCircleGeometry(1,'y',0.5), new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
                ],
                RZ: [
                    [ new THREE.Line( createCircleGeometry(1,'z',0.5), new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
                ],
                RE: [
                    [ new THREE.Line( createCircleGeometry(1.25,'z',1), new GizmoLineMaterial( { color: 0x00ffff } ) ) ]
                ],
                RXYZE: [
                    [ new THREE.Line( createCircleGeometry(1,'z',1), new GizmoLineMaterial( { color: 0xff00ff } ) ) ]
                ]
            };

            this.pickerGizmos = {
                RX: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), new GizmoMaterial( { color: 0xff0000, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ 0, -Math.PI/2, -Math.PI/2 ] ]
                ],
                RY: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), new GizmoMaterial( { color: 0x00ff00, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ Math.PI/2, 0, 0 ] ]
                ],
                RZ: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ 0, 0, -Math.PI/2 ] ]
                ],
                RE: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1.25, 0.12, 2, 24 ), new GizmoMaterial( { color: 0x00ffff, opacity: 0.25 } ) ) ]
                ],
                RXYZE: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 2, 24 ), new GizmoMaterial( { color: 0xff00ff, opacity: 0.25 } ) ) ]
                ]
            };

        };

        this.setActivePlane = function ( axis ) {

            if ( axis == "RE" ) this.activePlane = this.planes[ "XYZE" ];

            if ( axis == "RX" ) this.activePlane = this.planes[ "YZ" ];

            if ( axis == "RY" ) this.activePlane = this.planes[ "XZ" ];

            if ( axis == "RZ" ) this.activePlane = this.planes[ "XY" ];

            this.hide();
            this.show();

        };

        this.update = function ( rotation, eye2 ) {

            THREE.TransformGizmo.prototype.update.apply( this, arguments );

            var tempMatrix = new THREE.Matrix4();
            var worldRotation = new THREE.Euler( 0, 0, 1 );
            var tempQuaternion = new THREE.Quaternion();
            var unitX = new THREE.Vector3( 1, 0, 0 );
            var unitY = new THREE.Vector3( 0, 1, 0 );
            var unitZ = new THREE.Vector3( 0, 0, 1 );
            var quaternionX = new THREE.Quaternion();
            var quaternionY = new THREE.Quaternion();
            var quaternionZ = new THREE.Quaternion();
            var eye = eye2.clone();

            worldRotation.copy( this.planes["XY"].rotation );
            tempQuaternion.setFromEuler( worldRotation );

            tempMatrix.makeRotationFromQuaternion( tempQuaternion ).getInverse( tempMatrix );
            eye.applyMatrix4( tempMatrix );

            this.traverse(function(child) {

                tempQuaternion.setFromEuler( worldRotation );

                if ( child.name == "RX" ) {
                    quaternionX.setFromAxisAngle( unitX, Math.atan2( -eye.y, eye.z ) );
                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                    child.quaternion.copy( tempQuaternion );
                }

                if ( child.name == "RY" ) {
                    quaternionY.setFromAxisAngle( unitY, Math.atan2( eye.x, eye.z ) );
                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
                    child.quaternion.copy( tempQuaternion );
                }

                if ( child.name == "RZ" ) {
                    quaternionZ.setFromAxisAngle( unitZ, Math.atan2( eye.y, eye.x ) );
                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );
                    child.quaternion.copy( tempQuaternion );
                }

            });

        };

        this.init();

    };

    THREE.TransformGizmoRotate.prototype = Object.create( THREE.TransformGizmo.prototype );

    THREE.TransformGizmoTranslateRotate = function () {

        THREE.TransformGizmo.call( this );

        var scope = this;

        this.setHandlePickerGizmos = function () {

            var arrowGeometry = createArrowGeometry( 0, 0.05, 0.2, 12, 1, false );
            var lineGeometry = new THREE.Geometry();
            lineGeometry.vertices.push( new THREE.Vector3( 0, 0, -0.1 ), new THREE.Vector3( 0, 0, 0.1 ), new THREE.Vector3( -0.1, 0, 0 ), new THREE.Vector3( 0.1, 0, 0 ) );
            var theta = 0.15;

            this.handleGizmos = {
                Z: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xffffff } ) ), [ 0, 0, 0.25 ], [ Math.PI/2, 0, 0 ] ],
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.015, 0.015, 0.6, 4, 1, false ), new GizmoMaterial( { color: 0xffffff } ) ), [ 0, 0, 0.5 ],[ Math.PI/2, 0, 0 ] ]
                ],
                RX: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.015, 12, 60, theta * 2 * Math.PI ), new GizmoMaterial( { color: 0xff0000 } ) ), [ 0, 0, 0 ], [ theta * Math.PI, -Math.PI/2, 0 ] ],
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.05, 0.05, 0.015, 60, 1, false ), new GizmoMaterial( { color: 0xff0000 } ) ), [ 0, 0, 1 ], [ Math.PI/2, 0, 0 ] ]
                ],
                RY: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.015, 12, 60, theta * 2 * Math.PI ), new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0 ], [ Math.PI/2, 0, (0.5-theta)*Math.PI ] ],
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.05, 0.05, 0.01, 60, 1, false ), new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 1 ] ]
                ]
            };

            this.pickerGizmos = {
                Z: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.12, 0.12, 0.65, 4, 1, false ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0.5 ], [ Math.PI/2, 0, 0 ] ]
                ],
                RX: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, theta * 2 * Math.PI ), new GizmoMaterial( { color: 0xff0000, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ theta * Math.PI, -Math.PI/2, 0 ] ]
                ],
                RY: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, theta * 2 * Math.PI ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0 ], [ Math.PI/2, 0, (0.5-theta)*Math.PI ] ]
                ]
            };

            this.subPickerGizmos = {
                Z: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.12, 0.12, 0.65, 4, 1, false ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0.5 ], [ Math.PI/2, 0, 0 ] ]
                ]
            };

            this.highlightGizmos = {
                Z: [
                ],
                RX: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.02, 12, 60, 2 * Math.PI ), new GizmoMaterial( { color: 0xff0000, opacity: 1 } ) ), [ 0, 0, 0 ], [ 0, -Math.PI/2, -Math.PI/2 ], false ]
                ],
                RY: [
                    [ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.02, 12, 60, 2 * Math.PI ), new GizmoMaterial( { color: 0x0000ff, opacity: 1 } ) ), [ 0, 0, 0 ], [ Math.PI/2, 0, 0 ], false ]
                ]
            };

            this.hemiPickerGizmos = {
                XYZ: [
                    [ new THREE.Mesh( new THREE.SphereGeometry( 1.2, 8, 8, 0, Math.PI ), new GizmoMaterial( { color: 0x0000ff } ) ), null, null, false ]
                ]
            };

        };

        this.setActivePlane = function ( axis, eye ) {

            if ( this.activeMode == "translate" ) {

                var tempMatrix = new THREE.Matrix4();
                eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

                if ( axis == "X" ) {
                    this.activePlane = this.planes[ "XY" ];
                    if ( Math.abs(eye.y) > Math.abs(eye.z) ) this.activePlane = this.planes[ "XZ" ];
                }

                if ( axis == "Y" ){
                    this.activePlane = this.planes[ "XY" ];
                    if ( Math.abs(eye.x) > Math.abs(eye.z) ) this.activePlane = this.planes[ "YZ" ];
                }

                if ( axis == "Z" ){
                    this.activePlane = this.planes[ "XZ" ];
                    if ( Math.abs(eye.x) > Math.abs(eye.y) ) this.activePlane = this.planes[ "YZ" ];
                }

            } else if ( this.activeMode == "rotate" ){

                if ( axis == "RX" ) this.activePlane = this.planes[ "YZ" ];

                if ( axis == "RY" ) this.activePlane = this.planes[ "XZ" ];

                if ( axis == "RZ" ) this.activePlane = this.planes[ "XY" ];

            }

            this.hide();
            this.show();

        };

        this.update = function ( rotation, eye2 ) {

            if ( this.activeMode == "translate" ) {

                THREE.TransformGizmo.prototype.update.apply( this, arguments );

            } else if ( this.activeMode == "rotate" ) {

                THREE.TransformGizmo.prototype.update.apply( this, arguments );

                var tempMatrix = new THREE.Matrix4();
                var worldRotation = new THREE.Euler( 0, 0, 1 );
                var tempQuaternion = new THREE.Quaternion();
                var unitX = new THREE.Vector3( 1, 0, 0 );
                var unitY = new THREE.Vector3( 0, 1, 0 );
                var unitZ = new THREE.Vector3( 0, 0, 1 );
                var quaternionX = new THREE.Quaternion();
                var quaternionY = new THREE.Quaternion();
                var quaternionZ = new THREE.Quaternion();
                var eye = eye2.clone();

                worldRotation.copy( this.planes["XY"].rotation );
                tempQuaternion.setFromEuler( worldRotation );

                tempMatrix.makeRotationFromQuaternion( tempQuaternion ).getInverse( tempMatrix );
                eye.applyMatrix4( tempMatrix );

                this.traverse(function(child) {

                    tempQuaternion.setFromEuler( worldRotation );

                    if ( child.name == "RX" ) {
                        quaternionX.setFromAxisAngle( unitX, Math.atan2( -eye.y, eye.z ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                        child.quaternion.copy( tempQuaternion );
                    }

                    if ( child.name == "RY" ) {
                        quaternionY.setFromAxisAngle( unitY, Math.atan2( eye.x, eye.z ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
                        child.quaternion.copy( tempQuaternion );
                    }

                    if ( child.name == "RZ" ) {
                        quaternionZ.setFromAxisAngle( unitZ, Math.atan2( eye.y, eye.x ) );
                        tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );
                        child.quaternion.copy( tempQuaternion );
                    }

                });

            }

        };

        this.show = function () {
            this.traverse(function( child ) {
                if ( scope.parent == null || (scope.parent.useAllPickers || child.parent != scope.handles) ) child.visible = true;
                if ( child.material ) child.material.opacity = child.material.oldOpacity;
                if ( child.parent == scope.pickers || child.parent == scope.hemiPicker || child.parent == scope.subPickers) child.visible = false;
                if ( child.parent == scope.planes || child.parent == scope.highlights ) child.visible = false;
            });
            this.activePlane.visible = false;
        };

        this.highlight = function ( axis ) {
            this.traverse(function( child ) {
                if ( child.material && child.material.highlight ) {
                    if ( child.name == axis ) {
                        if ( child.parent == scope.highlights || child.parent == scope.handles ) child.visible = true;
                        child.material.highlight( true );
                    } else {
                        child.material.highlight( false );
                        child.material.opacity = 0.1;
                    }
                }
            });
        };

        this.init();

    };

    THREE.TransformGizmoTranslateRotate.prototype = Object.create( THREE.TransformGizmo.prototype );

    THREE.TransformGizmoScale = function () {

        THREE.TransformGizmo.call( this );

        this.setHandlePickerGizmos = function () {

            var arrowGeometry = createArrowGeometry( 0.125, 0.125, 0.125 );
            var lineXGeometry = createLineGeometry( 'X' );
            var lineYGeometry = createLineGeometry( 'Y' );
            var lineZGeometry = createLineGeometry( 'Z' );

            this.handleGizmos = {
                X: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ 0.5, 0, 0 ], [ 0, 0, -Math.PI/2 ] ],
                    [ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
                ],
                Y: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, 0.5, 0 ] ],
                    [ new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
                ],
                Z: [
                    [ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0.5 ], [ Math.PI/2, 0, 0 ] ],
                    [ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
                ],
                XYZ: [
                    [ new THREE.Mesh( new THREE.BoxGeometry( 0.125, 0.125, 0.125 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
                ]
            };

            this.pickerGizmos = {
                X: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0xff0000, opacity: 0.25 } ) ), [ 0.6, 0, 0 ], [ 0, 0, -Math.PI/2 ] ]
                ],
                Y: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0x00ff00, opacity: 0.25 } ) ), [ 0, 0.6, 0 ] ]
                ],
                Z: [
                    [ new THREE.Mesh( new THREE.CylinderGeometry( 0.2, 0, 1, 4, 1, false ), new GizmoMaterial( { color: 0x0000ff, opacity: 0.25 } ) ), [ 0, 0, 0.6 ], [ Math.PI/2, 0, 0 ] ]
                ],
                XYZ: [
                    [ new THREE.Mesh( new THREE.BoxGeometry( 0.4, 0.4, 0.4 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
                ]
            };

        };

        this.setActivePlane = function ( axis, eye ) {

            var tempMatrix = new THREE.Matrix4();
            eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

            if ( axis == "X" ) {
                this.activePlane = this.planes[ "XY" ];
                if ( Math.abs(eye.y) > Math.abs(eye.z) ) this.activePlane = this.planes[ "XZ" ];
            }

            if ( axis == "Y" ){
                this.activePlane = this.planes[ "XY" ];
                if ( Math.abs(eye.x) > Math.abs(eye.z) ) this.activePlane = this.planes[ "YZ" ];
            }

            if ( axis == "Z" ){
                this.activePlane = this.planes[ "XZ" ];
                if ( Math.abs(eye.x) > Math.abs(eye.y) ) this.activePlane = this.planes[ "YZ" ];
            }

            if ( axis == "XYZ" ) this.activePlane = this.planes[ "XYZE" ];

            this.hide();
            this.show();

        };

        this.init();

    };

    THREE.TransformGizmoScale.prototype = Object.create( THREE.TransformGizmo.prototype );

    THREE.TransformControls = function ( camera, domElement, mode ) {

        // TODO: Make non-uniform scale and rotate play nice in hierarchies
        // TODO: ADD RXYZ contol

        THREE.Object3D.call( this );

        domElement = ( domElement !== undefined ) ? domElement : document;

        this.gizmo = {};
        switch ( mode ) {
            case "translate":
                this.gizmo[mode] = new THREE.TransformGizmoTranslate();
                break;
            case "rotate":           
               this.gizmo[mode] = new THREE.TransformGizmoRotate();
               break;
            case "transrotate":
                this.gizmo[mode] = new THREE.TransformGizmoTranslateRotate();
                break;
            case "scale":
                this.gizmo[mode] = new THREE.TransformGizmoScale();
                break;
        }

        this.add(this.gizmo[mode]);
        this.gizmo[mode].hide();

        this.object = undefined;
        this.snap = null;
        this.snapDelta = 0;
        this.space = "world";
        this.size = 10;
        this.axis = null;
        this.useAllPickers = true;

        this.unitX = new THREE.Vector3( 1, 0, 0 );
        this.unitY = new THREE.Vector3( 0, 1, 0 );
        this.unitZ = new THREE.Vector3( 0, 0, 1 );
        this.normal = new THREE.Vector3(0, 0, 1);

        if ( mode === "transrotate" ) {
            var geometry = new THREE.Geometry();
            geometry.vertices.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1) );
            var material = new THREE.LineBasicMaterial( {color: 0x000000, linewidth:2, depthTest: false} );
            this.startLine = new THREE.Line( geometry, material );
            var geometry = new THREE.Geometry();
            var material = new THREE.LineBasicMaterial( {color: 0xffe603, linewidth:2, depthTest: false} );
            geometry.vertices.push( new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 1) );
            this.endLine = new THREE.Line( geometry, material );
            var geometry = new THREE.Geometry();
            var material = new THREE.LineDashedMaterial({color: 0x000000, linewidth:1, depthTest: false});
            geometry.vertices.push( new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0) );
            this.centerLine = new THREE.Line( geometry, material );

            var map = THREE.ImageUtils.loadTexture(Autodesk.Viewing.Private.getResourceUrl("res/textures/centerMarker_X.png"));
            map.magFilter = map.minFilter = THREE.NearestFilter;
            var geometry = new THREE.CircleGeometry( 0.1, 32 );
            var material = new THREE.MeshBasicMaterial({opacity: 1, side: THREE.DoubleSide, transparent:true, map:map});
            this.centerMark = new THREE.Mesh( geometry, material );
            this.centerMark.rotation.set(Math.PI/2, 0, 0);

            this.ticks = {};
            var map = THREE.ImageUtils.loadTexture(Autodesk.Viewing.Private.getResourceUrl("res/textures/cardinalPoint.png"));
            map.magFilter = map.minFilter = THREE.NearestFilter;
            var material = new THREE.MeshBasicMaterial({depthTest: false, opacity: 1, transparent:true, side: THREE.DoubleSide, map:map});
            var w = 0.12, h = 0.25, d = 1.15;

            this.ticks["RX"] = new THREE.Object3D();
            var geometry = new THREE.PlaneBufferGeometry(w, h);
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, -d-h/2);
            mesh.rotation.set(Math.PI/2, Math.PI/2, 0);
            this.ticks["RX"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(0, d+h/2, 0);
            mesh.rotation.set(0, Math.PI/2, 0);
            this.ticks["RX"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(0, 0, d+h/2);
            mesh.rotation.set(0, Math.PI/2, Math.PI/2);
            this.ticks["RX"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(0, -d-h/2, 0);
            mesh.rotation.set(0, Math.PI/2, 0);
            this.ticks["RX"].add(mesh);

            this.ticks["RY"] = new THREE.Object3D();
            mesh = mesh.clone();
            mesh.position.set(0, 0, -d-h/2);
            mesh.rotation.set(Math.PI/2, 0, 0);
            this.ticks["RY"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(-d-h/2, 0, 0);
            mesh.rotation.set(Math.PI/2, 0, Math.PI/2);
            this.ticks["RY"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(0, 0, d+h/2);
            mesh.rotation.set(Math.PI/2, 0, 0);
            this.ticks["RY"].add(mesh);

            mesh = mesh.clone();
            mesh.position.set(d+h/2, 0, 0);
            mesh.rotation.set(Math.PI/2, 0, Math.PI/2);
            this.ticks["RY"].add(mesh);
        }

        var scope = this;

        var _dragging = false;
        var _mode = mode;
        var _plane = "XY";

        var changeEvent = { type: "change" };
        var mouseDownEvent = { type: "mouseDown" };
        var mouseUpEvent = { type: "mouseUp", mode: _mode };
        var objectChangeEvent = { type: "objectChange" };

        var ray = new THREE.Raycaster();
        var pointerVector = new THREE.Vector3();
        var pointerDir = new THREE.Vector3();

        var point = new THREE.Vector3();
        var offset = new THREE.Vector3();

        var rotation = new THREE.Vector3();
        var offsetRotation = new THREE.Vector3();
        var scale = 1;
        this.clientScale = 1;

        var lookAtMatrix = new THREE.Matrix4();
        var eye = new THREE.Vector3();

        var tempMatrix = new THREE.Matrix4();
        var tempVector = new THREE.Vector3();
        var tempQuaternion = new THREE.Quaternion();
        var projX = new THREE.Vector3();
        var projY = new THREE.Vector3();
        var projZ = new THREE.Vector3();

        var quaternionXYZ = new THREE.Quaternion();
        var quaternionX = new THREE.Quaternion();
        var quaternionY = new THREE.Quaternion();
        var quaternionZ = new THREE.Quaternion();
        var quaternionE = new THREE.Quaternion();

        var oldPosition = new THREE.Vector3();
        var oldScale = new THREE.Vector3();
        var oldRotationMatrix = new THREE.Matrix4();

        var parentRotationMatrix  = new THREE.Matrix4();
        var parentScale = new THREE.Vector3();

        var worldPosition = new THREE.Vector3();
        var worldRotation = new THREE.Euler();
        var worldRotationMatrix  = new THREE.Matrix4();
        var camPosition = new THREE.Vector3();
        var camRotation = new THREE.Euler();

        this.attach = function ( object ) {

            scope.object = object;

            this.gizmo[_mode].show();

            scope.update();

            scope.updateUnitVectors();

        };

        this.detach = function ( object ) {

            scope.object = undefined;
            this.axis = null;

            this.gizmo[_mode].hide();

        };

        this.setMode = function ( mode ) {

            _mode = mode ? mode : _mode;

            if ( _mode == "scale" ) scope.space = "local";

            this.gizmo[_mode].show();

            this.update();
            scope.dispatchEvent( changeEvent );

        };

        this.getPicker = function () {

            return scope.gizmo[_mode].hemiPicker.children;

        };

        this.setPosition = function ( position ) {

            this.object.position.copy ( position );
            this.update();
        
        };

        this.setNormal = function ( normal ) {

            tempQuaternion.setFromUnitVectors( this.normal, normal );
            this.unitX.applyQuaternion( tempQuaternion );
            this.unitY.applyQuaternion( tempQuaternion );
            this.unitZ.applyQuaternion( tempQuaternion );
            this.normal.copy( normal );
            if (this.object) {
                this.object.quaternion.multiply ( tempQuaternion );
            }
            this.update();
        };

        this.setSnap = function ( snap, delta ) {

            scope.snap = snap;
            scope.snapDelta = delta;

        };

        this.setSize = function ( size ) {

            scope.size = size;
            this.update();
            scope.dispatchEvent( changeEvent );

        };

        this.setSpace = function ( space ) {

            scope.space = space;
            this.update();
            scope.dispatchEvent( changeEvent );

        };

        this.update = function (highlight) {

            if ( scope.object === undefined ) return;

            scope.object.updateMatrixWorld();
            worldPosition.setFromMatrixPosition( scope.object.matrixWorld );
            worldRotation.setFromRotationMatrix( tempMatrix.extractRotation( scope.object.matrixWorld ) );

            camera.updateMatrixWorld();
            camPosition.setFromMatrixPosition( camera.matrixWorld );
            //camRotation.setFromRotationMatrix( tempMatrix.extractRotation( camera.matrixWorld ) );

            this.position.copy( worldPosition );

            this.quaternion.setFromEuler( worldRotation );

            this.normal.set( 0, 0, 1 );
            this.normal.applyEuler( worldRotation );

            // keep same screen height (100px)
            var height;
            if ( camera.isPerspective ) {
                var dist = worldPosition.distanceTo( camPosition );
                height = 2 * Math.tan( camera.fov * Math.PI / 360 ) * dist;
            } else {
                // orthographic, so the world height is simply top minus bottom
                height = camera.top - camera.bottom;
            }
            this.scale.set( scope.size, scope.size, scope.size );

            // Set the gizmo position with the specified offset.
            if(this.gizmoOffset) {
                this.position.add(this.gizmoOffset);
            }
            this.updateMatrixWorld();
            //eye.copy( camPosition ).sub( worldPosition ).normalize();

            //if ( scope.space == "local" )
            //    this.gizmo[_mode].update( worldRotation, eye );
            //else if ( scope.space == "world" )
            //    this.gizmo[_mode].update( new THREE.Euler(), eye );

            if (highlight)
                this.gizmo[_mode].highlight( scope.axis );

        };

        this.setGizmoOffset = function(vec) {
            // Reset the gizmo if no vector passed in.
            this.gizmoOffset = !vec ? new THREE.Vector3(0,0,0) : vec;
            this.update();
        }

        this.updateUnitVectors = function () {

            this.unitX.set( 1, 0, 0 );
            this.unitY.set( 0, 1, 0 );
            this.unitZ.set( 0, 0, 1 );
            this.unitX.applyEuler( worldRotation );
            this.unitY.applyEuler( worldRotation );
            this.unitZ.applyEuler( worldRotation );

        };

        this.showRotationGizmos = function (set) {

            var handles = this.gizmo[_mode].handles.children;
            for ( var i = 0; i < handles.length; i++ ) {
                var child = handles[i];
                child.visible = true;
                if ( child.name.search("R") !== -1 ) child.visible = set;
            }
            this.useAllPickers = set;
            
        };

        this.highlight = function () {

            this.gizmo[_mode].highlight( this.axis || "Z" );

        };

        this.onPointerHover = function( event ) {

            if ( scope.object === undefined || _dragging === true ) return false;

            var pointer = event;

            var intersect = intersectObjects( pointer, scope.useAllPickers? scope.gizmo[_mode].pickers.children: scope.gizmo[_mode].subPickers.children );

            var axis = null;
            var mode = "";

            if ( intersect ) {

                axis = intersect.object.name;
                mode = axis.search("R") != -1 ? "rotate" : "translate";

            }

            if ( scope.axis !== axis ) {

                scope.axis = axis;
                scope.gizmo[_mode].activeMode = mode;
                scope.update(true);
                scope.dispatchEvent( changeEvent );

            } 

            if (scope.axis === null) {

                scope.gizmo[_mode].show();
            
            }

            return intersect? true : false;

        }

        this.onPointerDown = function( event ) {

            if ( scope.object === undefined || _dragging === true ) return false;
            
            var pointer = event;

            if ( event.pointerType === 'touch' ) {

                var intersect = intersectObjects( pointer, scope.useAllPickers? scope.gizmo[_mode].pickers.children: scope.gizmo[_mode].subPickers.children );

                var axis = null;
                var mode = "";

                if ( intersect ) {

                    axis = intersect.object.name;
                    mode = axis.search("R") != -1 ? "rotate" : "translate";

                }

                if ( scope.axis !== axis ) {

                    scope.axis = axis;
                    scope.gizmo[_mode].activeMode = mode;
                }
            }

            var intersect = null;

            if ( pointer.button === 0 || pointer.button === -1 || pointer.button === undefined ) {

                intersect = intersectObjects( pointer, scope.useAllPickers? scope.gizmo[_mode].pickers.children: scope.gizmo[_mode].subPickers.children );

                if ( intersect ) {

                    scope.dispatchEvent( mouseDownEvent );

                    scope.axis = intersect.object.name;

                    scope.update();

                    eye.copy( camera.position ).sub( worldPosition ).normalize();

                    scope.gizmo[_mode].setActivePlane( scope.axis, eye );

                    var planeIntersect = intersectObjects( pointer, [scope.gizmo[_mode].activePlane] );

                    if ( planeIntersect )
                        offset.copy( planeIntersect.point );

                    oldPosition.copy( scope.object.position );
                    oldScale.copy( scope.object.scale );

                    oldRotationMatrix.extractRotation( scope.object.matrix );
                    worldRotationMatrix.extractRotation( scope.object.matrixWorld );

                    if ( scope.object.parent ) {
                        parentRotationMatrix.extractRotation( scope.object.parent.matrixWorld );
                        parentScale.setFromMatrixScale( tempMatrix.getInverse( scope.object.parent.matrixWorld ) );
                    } else {
                        parentRotationMatrix.extractRotation( scope.object.matrixWorld );
                        parentScale.setFromMatrixScale( tempMatrix.getInverse( scope.object.matrixWorld ) );
                    }

                    // show rotation start line and ticks
                    if ( _mode === "transrotate" && scope.gizmo[_mode].activeMode === "rotate" ) {
                        scope.startLine.geometry.vertices[0].set(0, 0, 0).applyMatrix4( scope.matrixWorld );
                        scope.startLine.geometry.vertices[1].set(0, 0, 1).applyMatrix4( scope.matrixWorld );
                        scope.startLine.geometry.verticesNeedUpdate = true;
                        scope.parent.add( scope.startLine );

                        var pos = scope.object.geometry.getAttribute('position');
                        var pt1 = new THREE.Vector3().fromAttribute(pos, 0).applyMatrix4( scope.object.matrixWorld );
                        var pt2 = new THREE.Vector3().fromAttribute(pos, 1).applyMatrix4( scope.object.matrixWorld );
                        var pt3 = new THREE.Vector3().fromAttribute(pos, 2).applyMatrix4( scope.object.matrixWorld );
                        var pt4 = new THREE.Vector3().fromAttribute(pos, 3).applyMatrix4( scope.object.matrixWorld );
                        if (scope.axis === "RX") {
                            pt1.lerp(pt3, 0.5);
                            pt2.lerp(pt4, 0.5);
                            var dist = pt1.distanceTo(pt2);
                            scope.centerLine.material.dashSize = dist / 15;
                            scope.centerLine.material.gapSize = dist / 30;
                            scope.centerLine.geometry.vertices[0].copy(pt1);
                            scope.centerLine.geometry.vertices[1].copy(pt2);
                        } else {
                            pt1.lerp(pt2, 0.5);
                            pt3.lerp(pt4, 0.5);
                            var dist = pt1.distanceTo(pt3);
                            scope.centerLine.material.dashSize = dist / 15;
                            scope.centerLine.material.gapSize = dist / 30;
                            scope.centerLine.geometry.vertices[0].copy(pt1);
                            scope.centerLine.geometry.vertices[1].copy(pt3);
                        }
                        scope.centerLine.geometry.computeLineDistances();
                        scope.centerLine.geometry.verticesNeedUpdate = true;
                        scope.parent.add( scope.centerLine );

                        scope.ticks[scope.axis].position.copy( scope.position );
                        scope.ticks[scope.axis].quaternion.copy( scope.quaternion );
                        scope.ticks[scope.axis].scale.copy( scope.scale );
                        scope.parent.add( scope.ticks[scope.axis] );
                    }

                }

            }

            _dragging = true;

            return intersect? true: false;

        }

        this.onPointerMove = function( event ) {

            if ( scope.object === undefined || scope.axis === null || _dragging === false ) return false;

            var pointer = event;

            var planeIntersect = intersectObjects( pointer, [scope.gizmo[_mode].activePlane] );

            if ( planeIntersect )
                point.copy( planeIntersect.point );

            var mode = scope.gizmo[_mode].activeMode;
            if ( mode == "translate" ) {

                point.sub( offset );
                point.multiply(parentScale);

                if ( scope.space == "local" ) {

                    point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                    projX.copy( this.unitX );
                    projY.copy( this.unitY );
                    projZ.copy( this.unitZ );
                    tempVector.set( 0, 0, 0 );
                    if ( scope.axis.search("X") != -1 ) {
                        projX.multiplyScalar( point.dot( this.unitX ) );
                        tempVector.add( projX );
                    }
                    if ( scope.axis.search("Y") != -1 ) {
                        projY.multiplyScalar( point.dot( this.unitY ) );
                        tempVector.add(projY);
                    }
                    if ( scope.axis.search("Z") != -1 ) {
                        projZ.multiplyScalar( point.dot( this.unitZ ) );
                        tempVector.add( projZ );
                    }
                    point.copy( tempVector );

                    point.applyMatrix4( oldRotationMatrix );

                    scope.object.position.copy( oldPosition );
                    scope.object.position.add( point );

                }

                if ( scope.space == "world" || scope.axis.search("XYZ") != -1 ) {

                    projX.copy( this.unitX );
                    projY.copy( this.unitY );
                    projZ.copy( this.unitZ );
                    tempVector.set( 0, 0, 0 );
                    if ( scope.axis.search("X") != -1 ) {
                        projX.multiplyScalar( point.dot( this.unitX ) );
                        tempVector.add( projX );
                    }
                    if ( scope.axis.search("Y") != -1 ) {
                        projY.multiplyScalar( point.dot( this.unitY ) );
                        tempVector.add(projY);
                    }
                    if ( scope.axis.search("Z") != -1 ) {
                        projZ.multiplyScalar( point.dot( this.unitZ ) );
                        tempVector.add( projZ );
                    }
                    point.copy( tempVector );

                    point.applyMatrix4( tempMatrix.getInverse( parentRotationMatrix ) );

                    scope.object.position.copy( oldPosition );
                    scope.object.position.add( point );

                }

            } else if ( mode == "scale" ) {

                point.sub( offset );
                point.multiply(parentScale);

                if ( scope.space == "local" ) {

                    if ( scope.axis == "XYZ") {

                        scale = 1 + ( ( point.y ) / 50 );

                        scope.object.scale.x = oldScale.x * scale;
                        scope.object.scale.y = oldScale.y * scale;
                        scope.object.scale.z = oldScale.z * scale;

                    } else {

                        point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                        if ( scope.axis == "X" ) scope.object.scale.x = oldScale.x * ( 1 + point.x / 50 );
                        if ( scope.axis == "Y" ) scope.object.scale.y = oldScale.y * ( 1 + point.y / 50 );
                        if ( scope.axis == "Z" ) scope.object.scale.z = oldScale.z * ( 1 + point.z / 50 );

                    }

                }

            } else if ( mode == "rotate") {

                point.sub( worldPosition );
                point.multiply(parentScale);
                tempVector.copy(offset).sub( worldPosition );
                tempVector.multiply(parentScale);

                if ( scope.axis == "RE" ) {

                    point.applyMatrix4( tempMatrix.getInverse( lookAtMatrix ) );
                    tempVector.applyMatrix4( tempMatrix.getInverse( lookAtMatrix ) );

                    rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
                    offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

                    tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

                    var rotz = rotation.z - offsetRotation.z;
                    if ( scope.snap !== null ) {
                        var rotsnap = Math.round( rotz / scope.snap ) * scope.snap;
                        if ( Math.abs(rotsnap-rotz) < scope.snapDelta ) {
                            rotz = rotsnap;
                        }
                    }
                    quaternionE.setFromAxisAngle( eye, rotz );
                    quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionE );
                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                    scope.object.quaternion.copy( tempQuaternion );

                } else if ( scope.axis == "RXYZE" ) {

                    var tempAxis = point.clone().cross(tempVector).normalize(); // rotation axis

                    tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

                    var rot = - point.clone().angleTo(tempVector);
                    if ( scope.snap !== null ) {
                        var rotsnap = Math.round( rot / scope.snap ) * scope.snap;
                        if ( Math.abs(rotsnap-rot) < scope.snapDelta ) {
                            rot = rotsnap;
                        }
                    }
                    quaternionX.setFromAxisAngle( tempAxis, rot );
                    quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                    scope.object.quaternion.copy( tempQuaternion );

                } else if ( scope.space == "local" ) {

                    point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                    tempVector.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

                    var projx = point.dot(this.unitX), projy = point.dot(this.unitY), projz = point.dot(this.unitZ);
                    var tempx = tempVector.dot(this.unitX), tempy = tempVector.dot(this.unitY), tempz = tempVector.dot(this.unitZ);
                    rotation.set( Math.atan2( projz, projy ), Math.atan2( projx, projz ), Math.atan2( projy, projx ) );
                    offsetRotation.set( Math.atan2( tempz, tempy ), Math.atan2( tempx, tempz ), Math.atan2( tempy, tempx ) );

                    var rotx = rotation.x - offsetRotation.x;
                    var roty = rotation.y - offsetRotation.y;
                    var rotz = rotation.z - offsetRotation.z;
                    if ( scope.snap !== null ) {
                        if ( scope.axis.search("X") != -1 ) {
                            var rotsnap = Math.round( rotx / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-rotx) < scope.snapDelta ) {
                                rotx = rotsnap;
                            }
                        }
                        if ( scope.axis.search("Y") != -1 ) {
                            var rotsnap = Math.round( roty / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-roty) < scope.snapDelta ) {
                                roty = rotsnap;
                            }
                        }
                        if ( scope.axis.search("Z") != -1 ) {
                            var rotsnap = Math.round( rotz / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-rotz) < scope.snapDelta ) {
                                rotz = rotsnap;
                            }
                        }
                    }
                    quaternionX.setFromAxisAngle( this.unitX, rotx );
                    quaternionY.setFromAxisAngle( this.unitY, roty );
                    quaternionZ.setFromAxisAngle( this.unitZ, rotz );
                    quaternionXYZ.setFromRotationMatrix( oldRotationMatrix );

                    if ( scope.axis == "RX" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionX );
                    if ( scope.axis == "RY" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionY );
                    if ( scope.axis == "RZ" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionZ );

                    scope.object.quaternion.copy( quaternionXYZ );

                } else if ( scope.space == "world" ) {

                    var projx = point.dot(this.unitX), projy = point.dot(this.unitY), projz = point.dot(this.unitZ);
                    var tempx = tempVector.dot(this.unitX), tempy = tempVector.dot(this.unitY), tempz = tempVector.dot(this.unitZ);
                    rotation.set( Math.atan2( projz, projy ), Math.atan2( projx, projz ), Math.atan2( projy, projx ) );
                    offsetRotation.set( Math.atan2( tempz, tempy ), Math.atan2( tempx, tempz ), Math.atan2( tempy, tempx ) );

                    tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

                    var rotx = rotation.x - offsetRotation.x;
                    var roty = rotation.y - offsetRotation.y;
                    var rotz = rotation.z - offsetRotation.z;
                    if ( scope.snap !== null ) {
                        if ( scope.axis.search("X") != -1 ) {
                            var rotsnap = Math.round( rotx / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-rotx) < scope.snapDelta ) {
                                rotx = rotsnap;
                            }
                        }
                        if ( scope.axis.search("Y") != -1 ) {
                            var rotsnap = Math.round( roty / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-roty) < scope.snapDelta ) {
                                roty = rotsnap;
                            }
                        }
                        if ( scope.axis.search("Z") != -1 ) {
                            var rotsnap = Math.round( rotz / scope.snap ) * scope.snap;
                            if ( Math.abs(rotsnap-rotz) < scope.snapDelta ) {
                                rotz = rotsnap;
                            }
                        }
                    }
                    quaternionX.setFromAxisAngle( this.unitX, rotx );
                    quaternionY.setFromAxisAngle( this.unitY, roty );
                    quaternionZ.setFromAxisAngle( this.unitZ, rotz );
                    quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

                    if ( scope.axis == "RX" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
                    if ( scope.axis == "RY" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
                    if ( scope.axis == "RZ" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );

                    tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

                    scope.object.quaternion.copy( tempQuaternion );

                }

                // show rotation end line
                if (_mode === "transrotate" ) {
                    scope.add( scope.endLine );
                    scope.add( scope.centerMark );
                }

            }

            // update matrix
            scope.object.matrixAutoUpdate = true;

            scope.update(true);
            scope.dispatchEvent( changeEvent );
            scope.dispatchEvent( objectChangeEvent );

            return planeIntersect? true : false;

        }

        this.onPointerUp = function( event ) {

            if ( _dragging && ( scope.axis !== null ) ) {
                mouseUpEvent.mode = _mode;
                scope.dispatchEvent( mouseUpEvent )
            }
            _dragging = false;

            this.gizmo[_mode].show();

            this.updateUnitVectors();

            // remove rotation start/end lines
            if ( _mode === "transrotate" && this.gizmo[_mode].activeMode === "rotate" ) {
                this.remove( this.endLine );
                this.remove( this.centerMark );
                this.parent.remove( this.centerLine );
                this.parent.remove( this.startLine );
                this.parent.remove( this.ticks[this.axis] );
            }

            return false;

        }

        function intersectObjects( pointer, objects ) {
            return THREE.TransformControls.intersectObjects(pointer.canvasX, pointer.canvasY, objects, camera, true);
        }
    };

    THREE.TransformControls.intersectObjects = (function () {

        var pointerVector = new THREE.Vector3();
        var pointerDir = new THREE.Vector3();
        var ray = new THREE.Raycaster();

        return function(clientX, clientY, objects, camera, recursive) {

            // Convert client to viewport coords (in [-1,1]^2)
            var x =  (clientX  / camera.clientWidth)  * 2 - 1;
            var y = -(clientY  / camera.clientHeight) * 2 + 1; // y-direction flips between canvas and viewport coords

            if (camera.isPerspective) {
                pointerVector.set(x, y, 0.5);
                pointerVector.unproject(camera);
                ray.set(camera.position, pointerVector.sub(camera.position).normalize());
            } else {
                pointerVector.set(x, y, -1);
                pointerVector.unproject(camera);
                pointerDir.set(0, 0, -1);
                ray.set(pointerVector, pointerDir.transformDirection(camera.matrixWorld));
            }

            var intersections = ray.intersectObjects(objects, recursive);
            return intersections[0] ? intersections[0] : null;
        };
    })();

    THREE.TransformControls.prototype = Object.create( THREE.Object3D.prototype );


    /* ********* ********** ********** ********** ********** ********* */

    THREE.CSS2DObject = function ( element ) {

        THREE.Object3D.call( this );
    
        this.element = element;
        this.element.style.position = 'fixed';
    
        this.addEventListener('removed', function ( event ) {
    
            if ( this.element.parentNode !== null ) {
    
                this.element.parentNode.removeChild( this.element );
    
            }
    
        } );    
    };
    THREE.CSS2DObject.prototype = Object.create( THREE.Object3D.prototype );
    THREE.CSS2DObject.prototype.constructor = THREE.CSS2DObject;
    
    
    THREE.CSS2DRenderer = function ( div ) {
    
        // console.log( 'THREE.CSS2DRenderer', THREE.REVISION );
    
        var _width, _height;
        var _widthHalf, _heightHalf;
    
        var vector = new THREE.Vector3();
        var viewMatrix = new THREE.Matrix4();
        var viewProjectionMatrix = new THREE.Matrix4();
    
        var domElement = document.getElementById('viewer-label-container');

        if (!domElement) {
            var domElement = document.createElement( 'div' );
            domElement.style.zIndex = 1;
            domElement.style.overflow = 'hidden';
            domElement.style.pointerEvents = "none";
            domElement.style.position = 'fixed';
            domElement.style.top = "0px";
            domElement.className = 'viewer-label-container';
            domElement.id = 'viewer-label-container';
            div.appendChild( domElement );
            this.domElement = domElement;
        }
    
        this.getSize = function () {
    
            return {
                width: _width,
                height: _height
            };
    
        };
    
        this.setSize = function ( width, height ) {
    
            _width = width;
            _height = height;
    
            _widthHalf = _width / 2;
            _heightHalf = _height / 2;
    
            domElement.style.width = width + 'px';
            domElement.style.height = height + 'px';
    
        };
    
        this.setSize( div.clientWidth, div.clientHeight );
    
        var renderObject = function ( object, camera ) {
    
            if ( object instanceof THREE.CSS2DObject ) {
                var pos = object.position.clone();
                pos.project(camera);
                
                var element = object.element;
                var style = 'translate(-50%,-50%) translate(' + ( pos.x * _widthHalf + _widthHalf ) + 'px,' + ( - pos.y * _heightHalf + _heightHalf ) + 'px)';
    
                element.style.transform = style;
                element.style.position = 'absolute';
    
                if ( element.parentNode !== domElement ) {
    
                    domElement.appendChild( element );
    
                }
            }
    
            for ( var i = 0, l = object.children.length; i < l; i ++ ) {
    
                renderObject( object.children[ i ], camera );
    
            }
    
        };
    
        this.render = function ( scene, camera ) {
    
            scene.updateMatrixWorld();
    
            if ( camera.parent === null ) camera.updateMatrixWorld();
    
            viewMatrix.copy( camera.matrixWorldInverse );
            viewProjectionMatrix.multiplyMatrices( camera.projectionMatrix, viewMatrix );
    
            renderObject( scene, camera );
    
        };
    
    };
    