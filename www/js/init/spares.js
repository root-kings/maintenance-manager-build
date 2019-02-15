var spareview, stageEditView, stageEditViewModal

document.addEventListener('DOMContentLoaded', function() {
	fetch(hostaddress + '/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format('YYYY-MM-DD')
				spare.vetting.date = moment(spare.vetting.date).format('YYYY-MM-DD')
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview = new Vue({
				el: '#spares',
				data: {
					spares: listspares
				},
				mounted: function() {
					M.Collapsible.init(document.querySelectorAll('.collapsible'), {
						accordion: false
					})
					// M.Modal.init(document.querySelectorAll('.modal'))
					// M.Datepicker.init(
					// 	document.querySelectorAll('.datepicker'),
					// 	{
					// 		defaultDate: new Date(),
					// 		setDefaultDate: true,
					// 		format: 'yyyy-mm-dd'
					// 	}
					// )
					M.updateTextFields()
				}
			})
		})
})

function spareEdit(id) {
	localStorage.setItem('spareId', id)
	window.location.href = 'file:///android_asset/www/spare'
}

function spareDelete(id) {
	if (confirm('Delete this spare?')) {
		fetch(hostaddress + '/api/spare/' + id + '/delete', {
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
		/* $.post('/api/spare/' + id + '/delete', function (result) {
            window.location = '/spares';
        }); */
	}
}

function spareStageUpdate(id, stage) {
	fetch(hostaddress + '/api/spare/' + id + '/stage', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ stage: stage })
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				updateView()
				M.toast({ html: 'Updated!' })
			}
		})
	/* $.post('/api/spare/' + id + '/stage',updateObject, function (result) {
	    window.location = '/spares';
	}); */
}

function spareEditTimerModal(id) {
	stageEditViewModal = M.Modal.init(document.getElementById('sparestagemodal' + id))

	stageEditViewModal.open()

	M.updateTextFields()
}

function spareEditTimer(id) {
	var newtimerform = new FormData(document.getElementById('sparestagemodalform' + id))
	var newtimerdata = {}
	newtimerform.forEach(function(value, key) {
		newtimerdata[key] = value
	})

	var newtimer = {
		requisition: {
			date: new Date(newtimerdata['requisition-date']),
			timeout: newtimerdata['requisition-timeout']
		},
		so: {
			date: new Date(newtimerdata['so-date']),
			timeout: newtimerdata['so-timeout']
		},
		tod: {
			date: new Date(newtimerdata['tod-date']),
			timeout: newtimerdata['tod-timeout']
		},
		tsc: {
			date: new Date(newtimerdata['tsc-date']),
			timeout: newtimerdata['tsc-timeout']
		},
		vetting: {
			date: new Date(newtimerdata['vetting-date']),
			timeout: newtimerdata['vetting-timeout']
		}
	}

	console.log(newtimer)

	fetch(hostaddress + '/api/spare/' + id + '/stage/timer', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newtimer)
	})
		.then(function(response) {
			return response.json()
		})
		.then(function(result) {
			if (result) {
				// updateView()
				M.toast({ html: 'Updated!' })
			}
		})
}

function updateView() {
	fetch(hostaddress + '/api/spares')
		.then(function(response) {
			return response.json()
		})
		.then(function(listspares) {
			listspares.forEach(spare => {
				spare.requisition.date = moment(spare.requisition.date).format('YYYY-MM-DD')
				spare.vetting.date = moment(spare.vetting.date).format('YYYY-MM-DD')
				spare.tod.date = moment(spare.tod.date).format('YYYY-MM-DD')
				spare.tsc.date = moment(spare.tsc.date).format('YYYY-MM-DD')
				spare.so.date = moment(spare.so.date).format('YYYY-MM-DD')
			})

			spareview.spares = listspares
		})
}
