$(function() {
	calculoHorario = new CalculoHorario();
});

var CalculoHorario = function() {
	this.registerEvents();
}

CalculoHorario.prototype = {
	registerEvents: function() {
		var that = this;

		$('#limpar').on('click', function() {
			that.clear();
		});

		$('#calcular').on('click', function() {
			that.calcularSaida($('#hora_entrada').val(), $('#hora_saida_almoco').val(), $('#hora_entrada_almoco').val())
		});
	},
	clear: function() {
		$('input[type="time"]').each(function () {
			$(this).val('');
		})
	},
	calcularSaida: function(entrada, saidaParaAlmoco, entradaPosAlmoco) {
		Date.prototype.addHours = function (value) {
			this.setHours(this.getHours() + value);
		}

		Date.prototype.addMins = function (value) {
			this.setMinutes(this.getMinutes() + value);
		}

		var auxEntrada = entrada.split(':');
		var horaEntrada = auxEntrada[0];
		var minEntrada = auxEntrada[1];

		var auxSaidaParaAlmoco = saidaParaAlmoco.split(':');
		var horaSaidaParaAlmoco = auxSaidaParaAlmoco[0];
		var minSaidaParaAlmoco = auxSaidaParaAlmoco[1];

		var auxEntradaPosAlmoco = entradaPosAlmoco.split(':');
		var horaEntradaPosAlmoco = auxEntradaPosAlmoco[0];
		var minEntradaPosAlmoco = auxEntradaPosAlmoco[1];

		var dataEntrada = new Date();
		dataEntrada.setHours(horaEntrada);
		dataEntrada.setMinutes(minEntrada);

		var dataSaidaParaAlmoco = new Date();
		dataSaidaParaAlmoco.setHours(horaSaidaParaAlmoco);
		dataSaidaParaAlmoco.setMinutes(minSaidaParaAlmoco);

		var diffManha = dataSaidaParaAlmoco - dataEntrada;
		var horaTotalManha = this.convertMiliToHour(diffManha);
		horaTotalManha = horaTotalManha.split(':');
		var horaManha = horaTotalManha[0];
		var minManha = horaTotalManha[1];

		var dataManha = new Date();
		dataManha.setHours(horaManha);
		dataManha.setMinutes(minManha);

		var dataTarde = new Date();
		dataTarde.setHours(8);
		dataTarde.setMinutes(0);

		var diffTardeManha = dataTarde - dataManha;
		var horaTotalTarde = this.convertMiliToHour(diffTardeManha);
		horaTotalTarde = horaTotalTarde.split(':');
		var horaTarde = horaTotalTarde[0];
		var minTarde = horaTotalTarde[1];

		var dataEntraPosAlmoco = new Date();
		dataEntraPosAlmoco.setHours(horaEntradaPosAlmoco);
		dataEntraPosAlmoco.setMinutes(minEntradaPosAlmoco);

		this.calcularAlmoco(dataSaidaParaAlmoco, dataEntraPosAlmoco);

		dataEntraPosAlmoco.setHours(parseFloat(horaTarde) + parseFloat(horaEntradaPosAlmoco));
		dataEntraPosAlmoco.setMinutes(parseFloat(minTarde) + parseFloat(minEntradaPosAlmoco));

		$('#hora_saida').val(dataEntraPosAlmoco.getHours() + ':' + dataEntraPosAlmoco.getMinutes());
	},
	convertMiliToHour: function (diff) {
		var msec = diff;
		var hh = Math.floor(msec / 1000 / 60 / 60);
		msec -= hh * 1000 * 60 * 60;
		var mm = Math.floor(msec / 1000 / 60);
		msec -= mm * 1000 * 60;
		return hh+':'+mm;
	},
	calcularAlmoco: function(pre, pos) {
		var diff = pos - pre;
		var total = this.convertMiliToHour(diff);
		//ajustar concatenação (verficar pad tipo php)
		$('#hora_total_almoco').val('0'+total);
	}
};