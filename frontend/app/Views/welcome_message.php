<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to CodeIgniter 4!</title>
    <meta name="description" content="The small framework with powerful features">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" type="image/png" href="/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
<div class="container mt-4">
    <div class="btn-group">
        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Select Area
        </button>
        <div class="dropdown-menu" style="max-height: 200px; overflow-y: auto;">
            <select multiple class="form-select" id="selectMultiple">
                <option value="DKI Jakarta">DKI Jakarta</option>
                <option value="Jawa Barat">Jawa Barat</option>
                <option value="Kalimantan">Kalimantan</option>
                <option value="Bali">Bali</option>
            </select>
        </div>
    </div>
    <button type="button" class="btn btn-secondary">
            Date From
    </button>
    <button type="button" class="btn btn-secondary">
            Date To
    </button>
    <button type="button" class="btn btn-secondary" onclick="fetchDataAndDrawChart()">
            View
    </button>
</div>
<div class="chart-container" style="margin-left: 80px; margin-right: 80px; margin-bottom: 60px; margin-top: 60px">
    <canvas id="myBarChart" width="700" height="200"></canvas>
</div>
<div class="container mt-4">
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Brand Name</th>
                <?php
                $responseData2 = $dataFromApi2;

                if ($responseData2 !== null && array_key_exists('groupedData', $responseData2)) {
                    $groupedData = $responseData2['groupedData'];

                    $areaNames = array_unique(array_column($groupedData, 'area_name'));

                    foreach ($areaNames as $areaName): ?>
                        <th scope="col"><?php echo $areaName; ?></th>
                    <?php endforeach;
                } else {
                    echo '</tr></thead><tbody>';
                    echo '<tr><td colspan="2">Data from API 2 is null or does not have groupedData.</td></tr>';
                    echo '</tbody></table></div>';
                    exit;
                }
                ?>
            </tr>
        </thead>
        <tbody>
            <?php
            $responseData2 = $dataFromApi2;

            if ($responseData2 !== null && array_key_exists('groupedData', $responseData2)) {
                $groupedData = $responseData2['groupedData'];

                $groupedBrandData = [];

                foreach ($groupedData as $row) {
                    $brandName = $row['brand_name'];

                    if (!isset($groupedBrandData[$brandName])) {
                        $groupedBrandData[$brandName] = [
                            'brand_name' => $brandName,
                            'percentage_compliances' => [],
                        ];
                    }

                    $groupedBrandData[$brandName]['percentage_compliances'][] = $row['percentage_compliance'];
                }

                foreach ($groupedBrandData as $brandData): ?>
                    <tr>
                        <td><?php echo $brandData['brand_name']; ?></td>
                        <?php foreach ($brandData['percentage_compliances'] as $percentage): ?>
                            <td><?php echo $percentage; ?>%</td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach;
            } else {
                echo '<tr><td colspan="2">Data from API 2 is null or does not have groupedData.</td></tr>';
            }
            ?>
        </tbody>
    </table>
</div>
<script>
    function fetchDataAndDrawChart() {
        var selectedValues = $('#selectMultiple').val();

        if (selectedValues !== null && selectedValues.length > 0) {
            var selectedString = selectedValues.join(',');

            $.ajax({
                url: 'http://localhost:5000/filter-area',
                type: 'POST',
                data: { area_name: selectedString },
                success: function (response) {
                    handleApiResponse(response);
                },
                error: function (error) {
                    console.error('API Request Error:', error);
                }
            });
        } else {
            console.log('Pilih setidaknya satu nilai.');
        }
    }

    function handleApiResponse(response) {
        drawBarChart(response.mergedData);
    }

    function drawBarChart(data) {
        var ctx = document.getElementById('myBarChart').getContext('2d');
        var myBarChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(data => data.area_name),
                datasets: [{
                    label: 'Percentage',
                    data: data.map(data => data.percentage_compliance),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }

    var initialData = <?php echo json_encode($dataFromApi1); ?>;
    if (initialData !== null && initialData.hasOwnProperty('mergedData') && Array.isArray(initialData.mergedData)) {
        drawBarChart(initialData.mergedData);
    } else {
        console.error('Data from API is null or does not have mergedData.');
    }
</script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"></script>

</body>
</html>
