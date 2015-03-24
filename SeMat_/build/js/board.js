MathApp.Board = {
	Model: {
		onViewInit: function () {
			console.log('init');
			
			var $inputImage = $('#inputImage'),
				URL = window.URL || window.webkitURL,
				blobURL,
				$originalImage;

			if (URL) {
				$inputImage.change(function () {
					var files = this.files,
						file;

					if (files && files.length) {
						file = files[0];

						if (/^image\/\w+$/.test(file.type)) {
							blobURL = URL.createObjectURL(file);
							$originalImage.on('built.cropper', function () {
								URL.revokeObjectURL(blobURL); // Revoke when load complete
							}).cropper('reset', true).cropper('replace', blobURL);
							$inputImage.val('');
						} else {
							//showMessage('Please choose an image file.');
						}
					}
				});
			} else {
				$inputImage.parent().remove();
			}
		},
		onViewShow: function () {
			var that = this;
			
			 $('#originalImage > img').bind('load', function() {
				
			});
			setTimeout(function() {$('#originalImage').imagefit();}, 1000)
			
			//that._repositionBaseImage();
		},
		_repositionBaseImage: function () {
			var $baseImageWrap = $('#originalImage'),
				$baseImage = $('#originalImage img'),
				$window = $(window),
				orientation = '',
				width = $baseImage.width(),
				height = $baseImage.height();

			if (width < height) {
				orientation = 'portrait';
			}
			$baseImageWrap.attr('data-orientation', orientation);
			console.log($baseImage.width(), $baseImage.height());
			return orientation;
		},
		createCrop: function () {
			var $window = $(window),
				$originalImage = $('#originalImage img'),
				width = $window.width(),
				height = $window.height();

			$('#toolbar-canvas').on('click', '[data-method]', function () {
				var data = $(this).data(),
					$target,
					result;

				if (data.method) {
					data = $.extend({}, data); // Clone a new one

					if (typeof data.target !== 'undefined') {
						$target = $(data.target);

						if (typeof data.option === 'undefined') {
							try {
								data.option = JSON.parse($target.val());
							} catch (e) {
								console.log(e.message);
							}
						}
					}

					result = $originalImage.cropper(data.method, {
						width: width,
						height: height
					});

					if (data.method === 'getCroppedCanvas') {
						$('#croppedImage').html(result);
						//$image.cropper('destroy');
					}

					if ($.isPlainObject(result) && $target) {
						try {
							$target.val(JSON.stringify(result));
						} catch (e) {
							console.log(e.message);
						}
					}

				}
			});

			$originalImage.cropper({
				aspectRatio: 4 / 3,
				crop: function (data) {
					// Output the result data for cropping image.
				},
				zoomable: false,
				mouseWheelZoom: false,
				strict: false
			});

			

			/*var dkrm = new Darkroom('#theImage img', {
				// Size options
				minWidth: 100,
				minHeight: 100,
				maxWidth: width,
				maxHeight: height,

				plugins: {
					crop: {
						//minHeight: 50,
						//minWidth: 50,
						//ratio: 1
					},
					save: {

					}

				},
				init: function () {
					var cropPlugin = this.getPlugin('crop');
					cropPlugin.selectZone(170, 25, 300, 300);
					//cropPlugin.requireFocus();
				}
			});*/
		}
	}
}