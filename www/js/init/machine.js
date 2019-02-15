var machineview

document.addEventListener('DOMContentLoaded', function() {
	populate(localStorage.getItem('machineId'))
})

function populate(id) {
	fetch(hostaddress + '/api/machine/' + id)
		.then(function(response) {
			return response.json()
		})
		.then(function(machine) {
			// machine.checkup.history.sort().reverse();

			// machine.checkup.last = moment(this.checkup.history.sort()[0]).format("DD MMM YYYY");
			machine.caseoptions = ['open', 'lte', 'cp', 'gfr']

			machineview = new Vue({
				el: '#machine',

				data: {
					machine: machine
				},
				mounted: function() {
					// M.Datepicker.init(document.getElementById('date'), {
					//     defaultDate: new Date(),
					//     setDefaultDate: true,
					//     format: "yyyy-mm-dd"
					// });

					M.FormSelect.init(document.querySelectorAll('select'))

					M.updateTextFields()
				}
			})
		})
}
