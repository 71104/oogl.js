YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "OOGL.Ajax",
        "OOGL.Context",
        "OOGL.IsometricProjection",
        "OOGL.Matrix2",
        "OOGL.Matrix3",
        "OOGL.Matrix4",
        "OOGL.OrthogonalProjection",
        "OOGL.PerspectiveProjection",
        "OOGL.RenderLoop",
        "OOGL.RotationMatrix2",
        "OOGL.RotationMatrix3",
        "OOGL.RotationMatrix4",
        "OOGL.ScalingMatrix2",
        "OOGL.ScalingMatrix3",
        "OOGL.ScalingMatrix4",
        "OOGL.TranslationMatrix4",
        "OOGL.Vector2",
        "OOGL.Vector3",
        "OOGL.Vector4",
        "context.AjaxFragmentShader",
        "context.AjaxProgram",
        "context.AjaxVertexShader",
        "context.ArrayBuffer",
        "context.AsyncTexture",
        "context.AttributeArray1",
        "context.AttributeArray2",
        "context.AttributeArray3",
        "context.AttributeArray4",
        "context.AttributeArrays",
        "context.AutoProgram",
        "context.AutoTexture",
        "context.Buffer",
        "context.CubeMap",
        "context.DynamicArrayBuffer",
        "context.DynamicBuffer",
        "context.DynamicElementArrayBuffer",
        "context.ElementArray",
        "context.ElementArrayBuffer",
        "context.FragmentShader",
        "context.Framebuffer",
        "context.Program",
        "context.Renderbuffer",
        "context.Shader",
        "context.StaticArrayBuffer",
        "context.StaticBuffer",
        "context.StaticElementArrayBuffer",
        "context.StreamArrayBuffer",
        "context.StreamBuffer",
        "context.StreamElementArrayBuffer",
        "context.Texture",
        "context.Texture2D",
        "context.Textures",
        "context.VertexShader"
    ],
    "modules": [
        "OOGL",
        "context"
    ],
    "allModules": [
        {
            "displayName": "context",
            "name": "context",
            "description": "TODO"
        },
        {
            "displayName": "OOGL",
            "name": "OOGL",
            "description": "This is OOGL's main namespace object and contains all the OOGL classes.\n\nAll OOGL-specific class constructors are contained in this object. For\nexample, to create an `OOGL.RenderLoop` object you construct it in this way:\n\n\tvar loop = new OOGL.RenderLoop( ... );\n\nThe `OOGL` object may also be invoked as a function, in which it expectes\nexactly one function argument which is a user-defined callback function that\ngets invoked as soon as the DOM of the page has loaded (this is accomplished\nusing the `DOMCOntentLoaded` JavaScript event):\n\n\tOOGL(function () {\n\t\t// here the DOM has fully loaded\n\t});\n\nThis is typically the right place to put WebGL/OOGL initialization code, such\nas GLSL shader and other asset loading code, as well as GLSL program\ncompilation and linking."
        }
    ]
} };
});