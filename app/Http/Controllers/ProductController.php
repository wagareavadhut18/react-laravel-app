<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json(["data" => $products]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $rules = array(
            "name" => "required",
            "description" => "required",
            "image" => "required",
        );
        $validator = Validator::make($request->all(), $rules); //no error
        if ($validator->fails()) {
            return $validator->errors();
        } else {
            $input = new Product();
            $input->product_name = $request->name;
            // this below line also upload and insert the file and create a new folder
            // for first time
            //$input->image = $request->file('image')->store('apiImages');
            // image insert start
            $input->image = $request->file('image')->getClientOriginalName();

            $path = $request->file('image')->store('apiImages');
            // image insert end
            $input->description = $request->description;
            $result = $input->save();
            if ($result) {
                return ["result" => "Data inserted"];
            } else {
                return ["result" => "Data Not inserted"];
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $input = Product::find($request->id);
        $input->product_name = $request->name;
        $input->description = $request->description;
        if ($request->image != '') {
            $input->image = $request->file('image')->getClientOriginalName();

            $path = $request->file('image')->store('apiImages');
        }
        $result = $input->save();
        if ($result) {
            return ["response" => "Data Updated Successfully"];
        } else {
            return ["response" => "Updation fail"];
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product = Product::find($id);
        $result = $product->delete();
        if ($result) {
            return ["response" => "Data Deleted Successfully"];
        } else {
            return ["response" => "something wrong"];
        }
    }
}
