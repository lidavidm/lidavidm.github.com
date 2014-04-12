var svg = d3.select('#lbg').append('svg')
    .attr({
        width: 960,
        height: 500
    });

var codebookSize;
function reset() {
    svg.selectAll('circle').remove();
    var inputSize = 1000;
    var numClusters = parseInt(document.getElementById('num-clusters').value, 10);
    var clustered = document.getElementById('clustered').checked;
    var clustersX = [];
    var clustersY = [];

    for (var i = 0; i < numClusters; i++) {
        clustersX.push(100 + Math.random() * 760);
        clustersY.push(100 + Math.random() * 300);
    }

    var xcoords = [];
    for (var i = 0; i < inputSize; i++) {
        xcoords.push(-Math.floor(Math.random() * numClusters) - 1);
    }

    var inputsEnter = svg.selectAll('.input').data(xcoords).enter().append('circle');
    var maxDist = 100;
    if (clustered) {
        inputSize = 50 * numClusters;
        inputsEnter.attr('cx', function(d) {
            return clustersX[-d - 1] + maxDist * (Math.random() - 0.5);
        });
        inputsEnter.attr('cy', function(d) {
            return clustersY[-d - 1] + maxDist * (Math.random() - 0.5);
        });
    }
    else {
        inputsEnter.attr('cx', function(d) {
            return 100 + Math.random() * 760;
        });
        inputsEnter.attr('cy', function(d) {
            return 100 + Math.random() * 300;
        });
    }
    inputsEnter.attr('r', 6);
    inputsEnter.attr('opacity', 0.4);
    inputsEnter.classed('input', true);


    codebookSize = parseInt(document.getElementById('codebook-size').value, 10);
    var dummyData = [];
    for (var i = 0; i < codebookSize; i++) {
        dummyData.push(-1);
    }

    var codewordsEnter = svg.selectAll('.codeword').data(dummyData).enter().append('circle');
    codewordsEnter.attr('cx', function(d) { return 100 + Math.random() * 760; });
    codewordsEnter.attr('cy', function(d) { return 100 + Math.random() * 300; });
    codewordsEnter.attr('stroke', '#000000');
    codewordsEnter.attr('fill', '#FF0000');
    codewordsEnter.attr('stroke-width', '4');
    codewordsEnter.attr('r', 7);
    codewordsEnter.classed('codeword', true);

    svg.selectAll('circle').on('mouseover', function() {
        var circle = d3.select(this);

        if (circle.data()[0] > -1) {
            var index = circle.data()[0];
            var related = svg.selectAll('circle').filter(function (d, i) { return d == index; });
            related.classed('hover', true);
        }
    });
    svg.selectAll('circle').on('mouseout', function() {
        var circle = d3.select(this);

        if (circle.data()[0] > -1) {
            var index = circle.data()[0];
            var related = svg.selectAll('circle').filter(function (d, i) { return d == index; });
            related.classed('hover', false);
        }
    });

    state = "assign_inputs";
}


var state = "assign_inputs";
function step() {
    switch (state) {
    case "assign_inputs":
        var inputs = svg.selectAll('.input');
        var codewords = svg.selectAll('.codeword');
        var scale = d3.scale.category20();

        inputs.each(function(d, i) {
            var input = d3.select(this);
            var minDistance = 1000000000;
            var closestCodeword = null;

            codewords.each(function(d, j) {
                var codeword = d3.select(this);
                codeword.attr('fill', scale(10 * j / codebookSize));
                codeword.data([j]);

                var distance = Math.pow(input.attr('cx') - codeword.attr('cx'), 2) +
                    Math.pow(input.attr('cy') - codeword.attr('cy'), 2);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestCodeword = j;
                }
            });

            var oldData = input.data()[0];
            input.data([closestCodeword]);

            // if assignment has changed from last time
            if (oldData > -1 && oldData !== closestCodeword) {
                input.transition().duration(500).delay(closestCodeword * 100).attr('r', 10).attr('opacity', 0.8);
                input.transition().duration(500).delay(closestCodeword * 100 + 500).attr('fill', scale(10 * closestCodeword / codebookSize));
                input.transition().duration(500).delay(closestCodeword * 100 + 1500).attr('r', 6).attr('opacity', 0.4);
            }
            else if (oldData <= -1) {
                input.transition().duration(500).attr('fill', scale(10 * closestCodeword / codebookSize));
            }
        });

        state = "average_inputs";
        break;

    case "average_inputs":
        var splitting = document.getElementById('splitting').checked;
        var codewords = svg.selectAll('.codeword');

        var shouldSplit = false;
        codewords.each(function(d, j) {
            var codeword = d3.select(this);
            var index = codeword.data()[0];
            var inputs = svg.selectAll('circle')
                .filter(function (d, i) { return d == index; })
                .filter('.input');
            var xsum = 0;
            var ysum = 0;
            inputs.each(function() {
                var input = d3.select(this);
                xsum += parseFloat(input.attr('cx'));
                ysum += parseFloat(input.attr('cy'));
            });
            if (inputs[0].length !== 0) {
                codeword.transition()
                    .attr('cx', xsum / inputs[0].length)
                    .attr('cy', ysum / inputs[0].length);
            }
            else {
                shouldSplit = true;
            }
        });

        if (splitting && shouldSplit) {
            state = "splitting";
        }
        else {
            state = "assign_inputs";
        }
        break;

    case "splitting":
        var splitting = document.getElementById('splitting').checked;

        if (!splitting) {
            state = "assign_inputs";
            break;
        }

        var codewords = svg.selectAll('.codeword');
        var toSplit = [];
        var canSplit = [];
        codewords.each(function(d) {
            var codeword = d3.select(this);
            var index = codeword.data()[0];
            var inputs = svg.selectAll('circle')
                .filter(function (d, i) { return d == index; })
                .filter('.input');

            if (inputs[0].length !== 0) {
                var distortion = 0;

                inputs.each(function() {
                    var input = d3.select(this);
                    distortion += Math.pow(input.attr('cx') - codeword.attr('cx'), 2) +
                        Math.pow(input.attr('cy') - codeword.attr('cy'), 2);
                });

                toSplit.push([codeword, distortion]);
            }
            else {
                canSplit.push(codeword);
            }
        });

        if (canSplit.length > 0) {
            toSplit.sort(function(a, b) {
                i = a[1];
                j = b[1];
                if (i > j) {
                    return -1;
                }
                else if (i === j) {
                    return 0;
                }
                else {
                    return 1;
                }
            });

            for (var i = 0; i < canSplit.length; i++) {
                var toBeSplit = toSplit[i][0];
                var replaced = canSplit[i];
                var x = parseFloat(toBeSplit.attr('cx')) + 20;
                var y = parseFloat(toBeSplit.attr('cy')) + 20;
                replaced.transition().delay(800 * i).duration(1000)
                    .attr('cx', x)
                    .attr('cy', y);
            }
        }

        state = "assign_inputs";

        break;

    default:
    }
}

reset();
