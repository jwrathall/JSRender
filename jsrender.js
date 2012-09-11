<script src="Assets/Scripts/jquery-1.7.min.js" type="text/javascript"></script>
<script src="Assets/Scripts/jsrender.js" type="text/javascript"></script>
<script src="Assets/Scripts/knockout-2.0.0.js" type="text/javascript"></script>
<script src="Assets/Scripts/knockout.mapping-latest.js" type="text/javascript"></script>
<script src="Assets/Scripts/json2.js" type="text/javascript"></script>
<script type="text/javascript">
    $(function() {
	
        function GetJson(val, isRebind) {
			//this used a .net web service to get data
            var jsonVal = JSON.stringify(val);
            if (!window.location.origin) window.location.origin = window.location.protocol + "//" + window.location.host + "/";
            $.ajax({
                type: 'POST',
                url: window.location.origin + 'where ever you get your data from',
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                data: "{\'categoryId\':\'" + jsonVal + "\' }",
                success: function(data, msg) {
                    var json = JSON.parse(data.d);
                    bindModel(json, isRebind);
                },
                error: function(xhr, msg) {
                    //change this to the bootstrap dialog
                }
            });
        }
        var viewModel;
        function bindModel(data, isRebind) {
            if (isRebind != true) {
                viewModel = ko.mapping.fromJS(data);
                ko.applyBindings(viewModel);
            } else {
                ko.mapping.fromJS(data, viewModel);
            }
            //console.log(data)
            $("#SubCategoryWrapper").html($("#_tmplSubCategory").render(viewModel()));
        }
    });
</script>