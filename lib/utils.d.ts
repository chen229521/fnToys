export declare enum DataType {
    Object = "Object",
    Array = "Array",
    Date = "Date",
    RegExp = "RegExp",
    Function = "Function",
    String = "String",
    Number = "Number",
    Boolean = "Boolean",
    Undefined = "Undefined",
    Null = "Null",
    Symbol = "Symbol",
    Set = "Set",
    Map = "Map"
}
export type _DataType = keyof typeof DataType;
