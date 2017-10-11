#include "BZVisualizationPanel.h"

#include <boost/algorithm/string.hpp>
#include <map>
#include <algorithm>
#include <memory>

BEGIN_EVENT_TABLE(BZVisualizationPanel, wxPanel)
                EVT_PAINT(BZVisualizationPanel::paintEvent)
END_EVENT_TABLE()

BZVisualizationPanel::BZVisualizationPanel(wxFrame* parent):wxPanel(parent)
{
    this->m_windowId = wxID_ANY;
    this->SetPosition(wxPoint( 460, 100));
    this->SetSize(wxSize(400, 650));
    this->SetName("visualization");
}

void BZVisualizationPanel::paintEvent(wxPaintEvent &evt)
{
    wxPaintDC dc(this);
    render(dc);
}

void BZVisualizationPanel::paintNow()
{
    wxClientDC dc(this);
    render(dc);
}

//const wxColour foreGround = wxColour(69,233,38);
const wxColour foreGround = wxColour(70,234,39);
const wxColour kBIRTH_COLOUR = wxColour(255, 0, 0);
const wxColour kLIFE_COLOUR = wxColour( 0, 255, 0);
const wxColour kDEATH_COLOUR = wxColour(25, 200, 255);
const wxColour kREMOVE_COLOUR = wxColour(0, 0, 0);


wxColour state_colour(const Node::State& state)
{
    static std::map<Node::State,wxColour> m =
            {
                    {Node::State::born, kBIRTH_COLOUR},
                    {Node::State::alive, kLIFE_COLOUR},
                    {Node::State::dead, kDEATH_COLOUR},
                    {Node::State::remove, kREMOVE_COLOUR}
            };
    return m[state];
}

void BZVisualizationPanel::drawNode(wxDC& dc, Node* node, const int x, const int y)
{
    wxPen pen = dc.GetPen();
    pen.SetColour(state_colour( node->get_state()));
    pen.SetWidth(2);

    dc.SetPen(pen);
    dc.SetTextForeground(state_colour( node->get_state()));

    dc.SetBrush(*wxTRANSPARENT_BRUSH);
    dc.DrawCircle(x, y, 6);

    dc.DrawText(node->getid(), x - 50, y + 6);

    char txt[256];
    snprintf( txt, 256, "Messages: %i", node->get_messages());
    dc.DrawText(txt, x - 50, y + 18);
}

void BZVisualizationPanel::render(wxDC&  dc)
{
    wxSize sz = this->GetSize();
    wxPoint c = wxPoint(sz.GetWidth()/2,sz.GetHeight()/2);
    double r = 0.4 * std::min(sz.GetWidth(), sz.GetHeight());

    if(!_nodes.empty()) {
        double dr = (2.0 * M_PI) / (float)_nodes.size();
        double theta = 0.0;
        for(auto node : _nodes)
            {
            double x = c.x + r * cos(theta);
            double y = c.y + r * sin(theta);

            drawNode(dc, (node.get()), x, y);
            theta += dr;
            }
        }

    wxPen pen = dc.GetPen();
    pen.SetColour(foreGround);
    dc.SetTextForeground(foreGround);
    dc.SetPen(pen);
    std::string txt = std::to_string(_nodes.size());
    txt.append(" Nodes");
    dc.DrawText(txt, 25, 25);

}

void parse_node_params(const std::string& item, std::string& id, int& message_count)
{
    std::vector<std::string> params;
    boost::split(params, item, boost::is_any_of("|"));
    id = params[0];
    std::string::size_type sz = params[1].length();
    message_count = std::stoi(params[1], &sz);
}

void BZVisualizationPanel::push_new_nodes(const std::vector<std::string>& nodes)
{
    for(auto& raw_node : nodes)
        {
        std::string id("");
        int message_count = 0;
        parse_node_params(raw_node, id, message_count);
        auto n = find_if(_nodes.begin(), _nodes.end(), [id](auto it)
            {
            return (*it).getid()==id;
            });

        if(n == _nodes.end())
            {
            _nodes.push_back(std::shared_ptr<Node>(new Node(id, message_count)));
            }
        }

}

void BZVisualizationPanel::set_node_states(const std::vector<std::string>& nodes)
{
    const int kSTATE_TIME = 6;
    for(auto node : _nodes)
        {
        if(node->get_state() == Node::State::dead)
            {
            if(node->get_state_time() > kSTATE_TIME)
                {
                node->set_state(Node::State::remove);
                }
            }

        auto n = std::find_if(nodes.begin(), nodes.end(), [node](auto it)
            {
            std::string id("");
            int message_count = 0;
            parse_node_params(it,id,message_count);
            return id == node->getid();
            });

        if(n == nodes.end())
            {
            node->set_state(Node::State::dead);
            }
        else
            {
            std::string id("");
            int message_count = 0;
            parse_node_params(*n,id,message_count);
            node->set_messages(message_count);
            }
        if(node->get_state() == Node::State::born)
            {
            if(node->get_state_time() > kSTATE_TIME)
                {
                node->set_state(Node::State::alive);
                }
            }
        }
}

void BZVisualizationPanel::remove_nodes()
{
    _nodes.erase(
            std::remove_if(
                    _nodes.begin(),
                    _nodes.end(),
                    [](auto n)
                        {
                        return n->get_state() == Node::State::remove;
                        }
            ),
            _nodes.end()
    );
}

void BZVisualizationPanel::update_node_data(const std::vector<std::string>& nodes)
{
    push_new_nodes(nodes);
    set_node_states(nodes);
    remove_nodes();
}

