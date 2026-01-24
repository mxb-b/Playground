/**
 * Massachusetts Snow Storm Explorer - Storm Comparison Tool
 * Compare storms across multiple metrics with visual charts
 */

class StormComparison {
    constructor() {
        this.chart = null;
        this.storm1 = null;
        this.storm2 = null;
        this.metrics = [
            { key: 'bostonSnowfall', label: 'Boston Snowfall (in)', unit: '"' },
            { key: 'duration', label: 'Duration', unit: '' },
            { key: 'peakWinds', label: 'Peak Winds', unit: '' },
            { key: 'deaths', label: 'Deaths', unit: '' },
            { key: 'powerOutages', label: 'Power Outages', unit: '' }
        ];

        this.init();
    }

    init() {
        this.cacheElements();
        this.populateSelectors();
        this.bindEvents();
        this.initChart();

        // Set default selections
        this.selectStorms('blizzard-1978', 'blizzard-2013');
    }

    cacheElements() {
        this.storm1Select = document.getElementById('storm1');
        this.storm2Select = document.getElementById('storm2');
        this.chartCanvas = document.getElementById('comparison-chart');
        this.detailsContainer = document.getElementById('comparison-details');
    }

    populateSelectors() {
        const storms = StormsDatabase.storms;
        const options = storms.map(storm =>
            `<option value="${storm.id}">${storm.name} (${storm.year})</option>`
        ).join('');

        if (this.storm1Select) this.storm1Select.innerHTML = options;
        if (this.storm2Select) this.storm2Select.innerHTML = options;

        // Set different defaults
        if (this.storm1Select) this.storm1Select.value = 'blizzard-1978';
        if (this.storm2Select) this.storm2Select.value = 'blizzard-2013';
    }

    bindEvents() {
        this.storm1Select?.addEventListener('change', () => this.updateComparison());
        this.storm2Select?.addEventListener('change', () => this.updateComparison());
    }

    selectStorms(id1, id2) {
        if (this.storm1Select) this.storm1Select.value = id1;
        if (this.storm2Select) this.storm2Select.value = id2;
        this.updateComparison();
    }

    updateComparison() {
        const id1 = this.storm1Select?.value;
        const id2 = this.storm2Select?.value;

        this.storm1 = StormsDatabase.getStormById(id1);
        this.storm2 = StormsDatabase.getStormById(id2);

        if (this.storm1 && this.storm2) {
            this.updateChart();
            this.updateDetails();
        }
    }

    initChart() {
        if (!this.chartCanvas) return;

        const ctx = this.chartCanvas.getContext('2d');

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Boston Snow', 'NESIS', 'Duration (hrs)', 'Wind (mph)'],
                datasets: [
                    {
                        label: 'Storm 1',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'rgba(168, 213, 229, 0.8)',
                        borderColor: '#a8d5e5',
                        borderWidth: 2
                    },
                    {
                        label: 'Storm 2',
                        data: [0, 0, 0, 0],
                        backgroundColor: 'rgba(245, 158, 11, 0.8)',
                        borderColor: '#f59e0b',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#c5d0de',
                            font: {
                                family: "'Inter', sans-serif"
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1a2744',
                        titleColor: '#f8fafc',
                        bodyColor: '#c5d0de',
                        borderColor: '#a8d5e5',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#c5d0de'
                        },
                        grid: {
                            color: 'rgba(168, 213, 229, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#c5d0de'
                        },
                        grid: {
                            color: 'rgba(168, 213, 229, 0.1)'
                        }
                    }
                }
            }
        });
    }

    updateChart() {
        if (!this.chart || !this.storm1 || !this.storm2) return;

        // Parse numeric values for comparison
        const storm1Data = [
            this.storm1.bostonSnowfall || 0,
            this.storm1.nesis || 0,
            this.parseDuration(this.storm1.duration),
            this.parseWinds(this.storm1.peakWinds)
        ];

        const storm2Data = [
            this.storm2.bostonSnowfall || 0,
            this.storm2.nesis || 0,
            this.parseDuration(this.storm2.duration),
            this.parseWinds(this.storm2.peakWinds)
        ];

        this.chart.data.datasets[0].label = this.getShortName(this.storm1.name);
        this.chart.data.datasets[0].data = storm1Data;

        this.chart.data.datasets[1].label = this.getShortName(this.storm2.name);
        this.chart.data.datasets[1].data = storm2Data;

        this.chart.update();
    }

    updateDetails() {
        if (!this.detailsContainer || !this.storm1 || !this.storm2) return;

        const comparisons = [
            {
                label: 'Boston Snowfall',
                value1: this.storm1.bostonSnowfallDisplay,
                value2: this.storm2.bostonSnowfallDisplay,
                winner: this.compareValues(this.storm1.bostonSnowfall, this.storm2.bostonSnowfall)
            },
            {
                label: 'Duration',
                value1: this.storm1.duration,
                value2: this.storm2.duration,
                winner: this.compareValues(this.parseDuration(this.storm1.duration), this.parseDuration(this.storm2.duration))
            },
            {
                label: 'Peak Winds',
                value1: this.storm1.peakWinds,
                value2: this.storm2.peakWinds,
                winner: this.compareValues(this.parseWinds(this.storm1.peakWinds), this.parseWinds(this.storm2.peakWinds))
            },
            {
                label: 'NESIS Category',
                value1: this.storm1.nesisCategory || 'N/A',
                value2: this.storm2.nesisCategory || 'N/A',
                winner: this.compareNESIS(this.storm1.nesisCategory, this.storm2.nesisCategory)
            },
            {
                label: 'Deaths',
                value1: this.storm1.deaths || 'Unknown',
                value2: this.storm2.deaths || 'Unknown',
                winner: 0 // Don't highlight deaths as "winner"
            },
            {
                label: 'Power Outages',
                value1: this.formatPowerOutages(this.storm1.powerOutages),
                value2: this.formatPowerOutages(this.storm2.powerOutages),
                winner: 0
            }
        ];

        this.detailsContainer.innerHTML = comparisons.map(comp => `
            <div class="comparison-metric ${comp.winner !== 0 ? 'metric-winner' : ''}">
                <span class="metric-value storm1 ${comp.winner === 1 ? 'winner' : ''}">${comp.value1}</span>
                <span class="metric-label">${comp.label}</span>
                <span class="metric-value storm2 ${comp.winner === 2 ? 'winner' : ''}">${comp.value2}</span>
            </div>
        `).join('');
    }

    parseDuration(duration) {
        if (!duration) return 0;
        const match = duration.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    parseWinds(winds) {
        if (!winds) return 0;
        const match = winds.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
    }

    compareValues(val1, val2) {
        if (val1 > val2) return 1;
        if (val2 > val1) return 2;
        return 0;
    }

    compareNESIS(cat1, cat2) {
        const ranking = { 'Cat 5': 5, 'Cat 4': 4, 'Cat 3': 3, 'Cat 2': 2, 'Cat 1': 1 };
        const rank1 = ranking[cat1] || 0;
        const rank2 = ranking[cat2] || 0;
        return this.compareValues(rank1, rank2);
    }

    formatPowerOutages(outages) {
        if (!outages) return 'Unknown';
        if (typeof outages === 'number') {
            if (outages >= 1000000) return `${(outages / 1000000).toFixed(1)}M`;
            if (outages >= 1000) return `${(outages / 1000).toFixed(0)}K`;
            return outages.toString();
        }
        return outages;
    }

    getShortName(name) {
        if (name.length > 15) {
            if (name.includes('1717')) return 'Great Snow 1717';
            if (name.includes('1888')) return 'Blizzard 1888';
            if (name.includes('Presidents')) return "Pres. Day '03";
            if (name.includes('Winter of 2015')) return 'Winter 2015';
            return name.split(' ').slice(0, 2).join(' ');
        }
        return name;
    }
}

// Initialize comparison tool when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.stormComparison = new StormComparison();
});
