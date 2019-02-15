var upcomingview

document.addEventListener('DOMContentLoaded', function() {
	fetch(hostaddress + '/machines/list')
		.then(function(response) {
			return response.json()
		})
		.then(function(listmachines) {
			listmachines.map(function(machine) {
				machine.soondays = moment(machine.checkup.next).diff(moment(), 'days')
				machine.soon = machine.soondays <= 10 ? true : false
			})

			listmachines.sort(function(m1, m2) {
				if (m1.soondays > m2.soondays) return 1
				if (m1.soondays < m2.soondays) return -1
				return 0
			})

			upcomingview = new Vue({
				el: '#upcoming',
				data: {
					machines: listmachines
				},

				mounted: function() {
					M.Collapsible.init(document.querySelectorAll('.collapsible'), {
						accordion: false
					})
					M.FormSelect.init(document.querySelectorAll('select'))
					M.Modal.init(document.querySelectorAll('.modal'))
					M.Datepicker.init(document.querySelectorAll('.datepicker'), {
						defaultDate: new Date(),
						setDefaultDate: true,
						format: 'yyyy-mm-dd'
					})
					M.updateTextFields()
				}
			})
		})
})

function machineEdit(id) {
	localStorage.setItem('machineId', id)
	window.location.href = 'file:///android_asset/www/machine'
}

function addRecord(id) {
	var record = {
		id: id,
		date: document.getElementById('date' + id).value
		//remark: $("#remark" + id).val()
	}

	// console.log(record);

	fetch(hostaddress + '/api/machine/record/add', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc.
		mode: 'cors', // no-cors, cors, *same-origin
		headers: {
			'Content-Type': 'application/json'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(record) // body data type must match "Content-Type" header
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				window.location.reload()
			}
		})
	/* $.post('/api/machine/record/add', record, function (result) {
        if (result) {
            window.location.reload();
        }
    }) */
}

function removeRecord(id, val) {
	var record = {
		id: id,
		date: val
	}

	// console.log(record);

	fetch(hostaddress + '/api/machine/record/remove', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(record)
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				window.location.reload()
			}
		})
	/* 
    $.post('/api/machine/record/remove', record, function (result) {
        if (result) {
            window.location.reload();
        }
    }) */
}

function machineDelete(id) {
	if (confirm('Delete this machine?')) {
		fetch(hostaddress + '/api/machine/' + id + '/delete', {
			method: 'POST',
			mode: 'cors'
		})
			.then(function(response) {
				return response.json()
			})
			.then(function(result) {
				if (result) {
					window.location.reload()
				}
			})

		/* $.post('/api/machine/' + id + '/delete', function (result) {
            window.location.reload();
        }); */
	}
}
function saveRemark(event, id) {
	fetch(hostaddress + '/api/machine/' + id + '/remark', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ remark: event.target.value })
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				M.toast({ html: 'Remark updated!' })
			}
		})
	/* 
    $.post('/api/machine/' + id + '/remark', {remark:event.target.value}, function (result) {
        // window.location.reload();
        M.toast({html:'Remark updated!'});
    }); */
	//console.log(id,event.target.value);
}
