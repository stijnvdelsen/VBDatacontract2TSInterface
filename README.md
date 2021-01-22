# VBDatacontract2TSInterfacef
Converts VB.NET DataContract to Typescript interfaces

## Example
The example is from StackOverflow: https://stackoverflow.com/questions/7853417/datacontract-xml-serialization-and-xml-attributes-with-vb-net

Converts this:
```VB.NET
Imports System
Imports System.Runtime.Serialization
Imports System.Xml
Imports System.Xml.Serialization
Imports System.ServiceModel

<DataContract()> _
<XmlSerializerFormat()> _
Public Class Test

    Private timestamp_att As Date
    Private success_att As String = ""

    <DataMember()>
    <XmlAttribute(AttributeName:="timestamp")> _
    Public Property timestamp() As Date

        Get
            Return Me.timestamp_att
        End Get
        Set(value As Date)
            Me.timestamp_att = value
        End Set
    End Property

    <DataMember()>
    <Xml.Serialization.XmlAttribute(AttributeName:="success")> _
    Public Property success() As String

        Get
            Return Me.success_att
        End Get
        Set(value As String)
            Me.success_att = value
        End Set
    End Property

End Class
```

Into this:
```Typescript
export interface Test {
    timestamp: Date;
    success: string;
}
```
