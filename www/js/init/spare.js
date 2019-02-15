var spareview

document.addEventListener('DOMContentLoaded', function() {
	populate(localStorage.getItem('spareId'))
})

function populate(id) {
	fetch(hostaddress + '/api/spare/' + id)
		.then(function(response) {
			return response.json()
		})
		.then(function(spare) {
			spareview = new Vue({
				el: '#spare',
				data: {
					spare: spare
				},
				mounted: function() {
					M.updateTextFields()
				}
			})
		})
}
