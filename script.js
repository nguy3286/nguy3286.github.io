async function init_array(isDemo)
{   
    // Read user input and error check
    if (isDemo){
        document.getElementById("input_target").value = "9";
        input_arr = document.getElementById("input_arr").value = "[1,2,7,11,15]";
    }
    else {
        if ((input_arr == "") || (input_target == "")) return null;
    }
    var input_target = document.getElementById("input_target").value;
    var input_arr = document.getElementById("input_arr").value;

    // Convert input string to array
    input_target = parseInt(input_target);
    input_arr = input_arr.replace(/\s/g, '').slice(1, -1).split(',').map(x=>+x);   // get rid of empty string, delete '[' and ']', split on comma, and convert '2' to 2
    
    build_array_div(input_arr);
    await sleep(2000);
    twoSum(input_arr, input_target);
}


function build_array_div(A)
{
    var newDiv = null;
    var grid_div = document.getElementsByClassName("grid-container")[0];
    grid_div.innerHTML = "";    // empty div of last inputted array
    
    for (var i=0; i < A.length; i++)
    {
        newDiv = document.createElement('div');
        newDiv.className = 'grid-item';
        newDiv.id = i;
        newDiv.innerText = A[i];
        grid_div.appendChild(newDiv);  
    }
    grid_div.style.display = "grid";
}


async function twoSum(A, target)
{
    var curr_sum, N = A.length, l = 0, r = N-1, l_color = "rgb(126, 11, 11)", r_color = "rgb(16, 128, 62)";

    highlight(0);
    await sleep(2000);
    unhighlight(0);

    highlight(1);
    A.sort(function(a, b) {
        return a - b;
    });
    build_array_div(A);
    await sleep(2000);
    unhighlight(1);

    highlight(2);
    document.getElementById(l).style.backgroundColor = l_color;
    document.getElementById(r).style.backgroundColor = r_color;
    await sleep(2000);
    unhighlight(2);

    while (l < r)
    {
        highlight(3);
        await sleep(2000);
        unhighlight(3);

        curr_sum = A[l] + A[r];
        highlight(4);
        await sleep(2000);
        unhighlight(4);

        if (curr_sum == target) {
            highlight(5);
            await sleep(2000);
            unhighlight(5);
            show_result([A[l], A[r]]);
            return null;
        }
        else if (curr_sum < target){
            highlight(6);
            await sleep(1000);
            if (l+1 < N) move_ptr(l, l+1, "rgb(126, 11, 11)");
            l++;
            await sleep(1500);
            unhighlight(6);
        }
        else {
            highlight(7);
            await sleep(1000);
            if (r-1 >= 0) move_ptr(r, r-1, "rgb(16, 128, 62)");
            r--;
            await sleep(1500);
            unhighlight(7);
        }
    }
    show_result([]);
}


function move_ptr(old_idx, new_idx, color) {
    document.getElementById(old_idx).style.backgroundColor = null;
    document.getElementById(new_idx).style.backgroundColor = color;
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function highlight(row_idx) {
    console.log(document.getElementsByClassName("hljs-ln-line hljs-ln-numbers")[row_idx].style.backgroundColor);
    document.getElementsByClassName("hljs-ln-line hljs-ln-numbers")[row_idx].style.backgroundColor = "rgba(255, 255, 0, 0.45)";
    document.getElementsByClassName("hljs-ln-line hljs-ln-code")[row_idx].style.backgroundColor = "rgba(255, 255, 0, 0.45)";
}


function unhighlight(row_idx) {
    document.getElementsByClassName("hljs-ln-line hljs-ln-numbers")[row_idx].style.backgroundColor = null;
    document.getElementsByClassName("hljs-ln-line hljs-ln-code")[row_idx].style.backgroundColor = null;
}

function show_result(arr) {
    document.getElementById("output").innerHTML = '[' + arr.toString() + ']';
    document.getElementById("output_div").style.display = "inline";
}