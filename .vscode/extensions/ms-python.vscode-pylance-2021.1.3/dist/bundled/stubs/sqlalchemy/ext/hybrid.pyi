from typing import Any, Optional
from ..orm import interfaces

HYBRID_METHOD: Any = ...
HYBRID_PROPERTY: Any = ...

class hybrid_method(interfaces.InspectionAttrInfo):
    is_attribute: bool = ...
    extension_type: Any = ...
    func: Any = ...
    def __init__(self, func, expr: Optional[Any] = ...) -> None: ...
    def __get__(self, instance, owner): ...
    expr: Any = ...
    def expression(self, expr): ...

class hybrid_property(interfaces.InspectionAttrInfo):
    is_attribute: bool = ...
    extension_type: Any = ...
    fget: Any = ...
    fset: Any = ...
    fdel: Any = ...
    def __init__(self, fget, fset: Optional[Any] = ..., fdel: Optional[Any] = ...,
                 expr: Optional[Any] = ...) -> None: ...
    def __get__(self, instance, owner): ...
    def __set__(self, instance, value): ...
    def __delete__(self, instance): ...
    def setter(self, fset): ...
    def deleter(self, fdel): ...
    expr: Any = ...
    def expression(self, expr): ...
    def comparator(self, comparator): ...

class Comparator(interfaces.PropComparator):
    property: Any = ...
    expression: Any = ...
    def __init__(self, expression) -> None: ...
    def __clause_element__(self): ...
    def adapt_to_entity(self, adapt_to_entity): ...

class ExprComparator(Comparator):
    expression: Any = ...
    hybrid: Any = ...
    def __init__(self, expression, hybrid) -> None: ...
    def __getattr__(self, key): ...
    @property
    def info(self): ...
    @property
    def property(self): ...
    def operate(self, op, *other, **kwargs): ...
    def reverse_operate(self, op, other, **kwargs): ...
